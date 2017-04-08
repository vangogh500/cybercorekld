var credentials = require('./credentials.js')
var jwt = require('jsonwebtoken')

var OneVOneListing = require('./models/onevoneladder.js')
var User = require('./models/user.js')
var LadderMatch = require('./models/laddermatch.js')

var elo = require('./lib/elo.js')

function verifyToken(req, res, next) {

  if(req.headers.authorization) {
    var token = req.headers.authorization.slice(7)
    jwt.verify(token, credentials.jwt.secret, function(err, data) {
      if(err) { res.status(401).send() }
      else if(data.user == 'admin') {
        next()
      }
      else {
        res.status(401).send()
      }
    })
  }
  else {
    res.status(401).send()
  }
}

module.exports = function(app) {
  app.post('/api/login', function(req,res) {
    if(req.body.user == credentials.credentials.user && req.body.password == credentials.credentials.password) {
      jwt.sign({ user: 'admin' }, credentials.jwt.secret, { expiresIn: '7 days'}, function(err, token) {
        if(err) {
          res.status(500).send()
        }
        else {
          res.send({token: token, user: 'admin'})
        }
      })
    }
    else {
      res.status(401).send()
    }
  })

  app.post('/api/auth/onevone/user', verifyToken, function(req,res) {
    var newUser = new User({
      csm: req.body.user.csm,
      name: req.body.user.name,
      ign: req.body.user.ign,
      email: req.body.user.email
    })
    var newOneVOneListing = new OneVOneListing({
      _user: newUser._id
    })
    newUser.save(function(err) {
      if(err) { res.status(500).send() }
      else {
        newOneVOneListing.save(function(err) {
          if(err) { res.status(500).send() }
          else { res.send({ userId: newUser._id, entryId: newOneVOneListing._id }) }
        })
      }
    })
  })

  app.get('/api/auth/onevone/ladder', verifyToken, function(req,res) {
    OneVOneListing.find({}).sort({ kp: -1 }).populate('_user').exec(function(err, ladder) {
      if(err) {
        res.status(500).send()
      }
      else if(ladder) {
        res.send(ladder)
      }
      else {
        res.status(404).send()
      }
    })
  })

  app.post('/api/auth/onevone/match', function(req,res) {
    OneVOneListing.find({ $or: [{ _user: req.body.playerOne._id}, { _user: req.body.playerTwo._id }]}, function(err, listings) {
      if(err) { res.status(500).send() }
      else {
        var kp_one = listings[0].kp
        var kp_two = listings[1].kp

        var d_kp = elo.calculate(kp_one, kp_two, listings[0].matches.length, listings[1].matches.length, ((req.body.winner == 'player_one') ? 0 : 1))
        var newMatch = new LadderMatch({
          ladder_type: '1v1',
          player_one: req.body.playerOne,
          player_two: req.body.playerTwo,
          winner: req.body.winner,
          win_condition: req.body.winCondition,
          date: req.body.date,
          d_kp
        })
        console.log(newMatch)
      }
    })
  })
}

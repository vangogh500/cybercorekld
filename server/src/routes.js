var credentials = require('./credentials.js')
var jwt = require('jsonwebtoken')

var OneVOneListing = require('./models/onevoneladder.js')
var User = require('./models/user.js')


function verifyToken(token, res, cb) {
  jwt.verify(token, credentials.jwt.secret, function(err, data) {
    if(err) { res.status(401).send() }
    else {
      cb(data)
    }
  })
}

module.exports = function(app) {
  app.post('/api/login', function(req,res) {
    console.log(req.body)
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

  app.post('/api/auth/onevone/user', function(req,res) {
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

  app.get('/api/auth/onevone/ladder', function(req,res) {
    if(req.headers.authorization) {
      var token = req.headers.authorization.slice(7)
      jwt.verify(token, credentials.jwt.secret, function(err, data) {
        if(err) { res.status(401).send() }
        else {
          console.log(data.user)
          if(data.user === 'admin') {
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
          }
          else {
            res.status(401).send()
          }
        }
      })
    }
    else {
      res.status(401).send()
    }
  })
}

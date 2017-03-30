var credentials = require('./credentials.js')
var jwt = require('jsonwebtoken')

var OneVOneListing = require('./models/onevoneuser.js')
var User = require('./models/user.js')

module.exports = function(app) {
  app.post('/login', function(req,res) {
    console.log(req.body)
    if(req.body.user == credentials.credentials.user && req.body.password == credentials.credentials.password) {
      jwt.sign({}, credentials.jwt.secret, { expiresIn: '7 days'}, function(err, token) {
        if(err) {
          res.status(500).send()
        }
        else {
          res.send(token)
        }
      })
    }
    else {
      res.status(401).send()
    }
  })

  app.post('/api/onevone/user', function(req,res) {
    var newUser = new User({
      csm: req.body.user.csm,
      name: req.body.user.name,
      ign: req.body.user.ign,
      email: req.body.user.email
    })
    var newOneVOneListing = new OneVOneListing({
      user: newUser._id
    })
    newUser.save(function(err) {
      if(err) { res.status(500).send() }
      else {
        newOneVOneListing.save(function(err) {
          if(err) { res.status(500).send() }
          else { res.send({ _id: newUser._id }) }
        })
      }
    })
  })

  app.get('/api/onevone/ladder', function(req,res) {
    OneVOneUser.find({}).sort({ kp: -1 }).populate('_user').exec(function(err, ladder) {
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
}

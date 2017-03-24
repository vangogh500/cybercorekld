var credentials = require('./credentials.js')
var jwt = require('jsonwebtoken')

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
}

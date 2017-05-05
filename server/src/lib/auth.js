var jwt = require('jsonwebtoken')
var credentials = require('../credentials.js')

exports.restrict = function(req, res, next) {
  if(req.headers.authorization) {
    var token = req.headers.authorization.slice(7)
    jwt.verify(token, credentials.jwt.secret, function(err, data) {
      if(err) { res.status(401).send() }
      else if(data.username == 'admin') {
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

exports.checkToken = function(req, res, next) {
  if(req.headers.authorization) {
    var token = req.headers.authorization.slice(7)
    jwt.verify(token, credentials.jwt.secret, function(err, data) {
      if(err) {
        req.body.authorized = false
      }
      else if(data.username == 'admin') {
        req.body.authorized = true
      }
      else {
        req.body.authorized = false
      }
      next()
    })
  }
  else {
    req.body.authorized = false
    next()
  }
}

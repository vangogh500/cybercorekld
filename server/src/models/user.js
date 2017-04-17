var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  csm: String,
  ign: String,
  name: String,
  email: String,
  creation: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Users', userSchema)

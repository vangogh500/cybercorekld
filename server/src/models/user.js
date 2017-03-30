var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  csm: String,
  ign: String,
  name: String,
  email: String
})

module.exports = mongoose.model('Users', userSchema)

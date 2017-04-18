var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = mongoose.Schema({
  csm: String,
  ign: String,
  name: String,
  email: String,
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
  creation: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Users', userSchema)

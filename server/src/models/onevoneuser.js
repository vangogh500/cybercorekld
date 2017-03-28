var mongoose = require('mongoose')

var OnevoneUserSchema = mongoose.Schema({
  csm: String,
  ign: String,
  name: String,
  email: String,
  kp: { type: Number, default: 1000 },
  lastGameDate: { type: Date },
  matches: []
})

module.exports = mongoose.model('OneVOneUser', OnevoneUserSchema)

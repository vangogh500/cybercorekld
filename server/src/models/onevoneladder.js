var mongoose = require('mongoose')
var Schema = mongoose.Schema

var OnevoneSchema = mongoose.Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'Users'},
  kp: { type: Number, default: 1000, index: true },
  lastGameDate: { type: Date },
  matches: []
})

module.exports = mongoose.model('OneVOneLadder', OnevoneSchema)

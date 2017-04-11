var mongoose = require('mongoose')
var Schema = mongoose.Schema

var matchSchema = mongoose.Schema({
  ladder_type: { type: String, enum: ['1v1', '3v3', '5v5']},
  player_one: {
    _user: { type: Schema.Types.ObjectId, ref: 'Users'},
    champion: String
  },
  player_two: {
    _user: { type: Schema.Types.ObjectId, ref: 'Users' },
    champion: String
  },
  winner: { type: String, enum: ['player_one', 'player_two'] },
  win_condition: { type: String, enum: ['cs', 'fb', 'ft'] },
  date: { type: Date, default: Date.now },
  initial_kp: {
    player_one: Number,
    player_two: Number
  },
  d_kp: {
    player_one: Number,
    player_two: Number
  }
})

module.exports = mongoose.model('LadderMatches', matchSchema)

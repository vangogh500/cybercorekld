var mongoose = require('mongoose')
var Schema = mongoose.Schema

var tournamentSchema = mongoose.Schema({
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
  winners: {
    first: {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    },
    second: {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    },
    third: {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    }
  },
  status: {
    type: String,
    enum: ['in progress', 'completed', 'scheduled'],
    default: 'scheduled'
  },
  name: { type: String, required: true },
  date: { type: Date, required: true, index: true },
  img: {
    thumbnail: String,
    banner: String
  }
})

module.exports = mongoose.model('Tournament', tournamentSchema)

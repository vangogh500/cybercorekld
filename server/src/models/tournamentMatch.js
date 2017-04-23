var mongoose = require('mongoose')
var Schema = mongoose.Schema

var scoreSchema = mongoose.Schema({
  score: { type: Number, required: true }
}, { _id: false })

var teamSchema = mongoose.Schema({
  name: String,
  id: { type: Schema.Types.ObjectId, ref: 'Team'}
}, { _id: false })

var sideSchema = mongoose.Schema({
  score: { type: scoreSchema },
  team: { type: teamSchema, required: true },
  seed: {
    displayName: String,
    sourceGame: {
      type: Schema.Types.ObjectId,
      ref: 'TournamentMatch'
    },
    rank: Number
  }
}, { _id: false })

var matchSchema = mongoose.Schema({
  name: { type: String, required: true },
  scheduled: { type: Date },
  sides: {
    home: { type: sideSchema, required: true },
    visitor: { type: sideSchema }
  }
})

module.exports = mongoose.model('TournamentMatch', matchSchema)

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var tournamentSchema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true, index: true },
  game: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['1v1', 'teams']
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
  winnningTeams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
  winningPlayers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['in progress', 'completed', 'scheduled'],
    default: 'scheduled'
  },
  matches: [{ type: Schema.Types.ObjectId, ref: 'TournamentMatch' }],
  links: {
    facebook: String,
    stream: String,
    gallery: String
  },
  imgs: {
    banner: { type: String, default: 'https://i.ytimg.com/vi/DLiNHCmJzV4/maxresdefault.jpg' }
  }
})

tournamentSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id  }
});

module.exports = mongoose.model('Tournament', tournamentSchema)

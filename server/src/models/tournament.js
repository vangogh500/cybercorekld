var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ImgSchema = new Schema({
  thumbnail: { type: String, default: 'http://ddragon.leagueoflegends.com/cdn/7.5.1/img/profileicon/23.png'},
  banner: { type: String, default: 'https://i.ytimg.com/vi/DLiNHCmJzV4/maxresdefault.jpg'}
}, { _id: false });

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
  img: { type: ImgSchema, default: ImgSchema },
  matches: [{ type: Schema.Types.ObjectId, ref: 'TournamentMatch' }],
  links: {
    fcbk: String,
    stream: String
  }
})

module.exports = mongoose.model('Tournament', tournamentSchema)

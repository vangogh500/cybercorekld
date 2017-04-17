var mongoose = require('mongoose')
var Schema = mongoose.Schema

var teamSchema = mongoose.Schema({
  name: { type: String, required: true },
  roster: {
    top: {
      _user: { type: Schema.Types.ObjectId, ref: 'Users'}
    },
    jungle: {
      _user: { type: Schema.Types.ObjectId, ref: 'Users'}
    },
    mid: {
      _user: { type: Schema.Types.ObjectId, ref: 'Users'}
    },
    adc: {
      _user: { type: Schema.Types.ObjectId, ref: 'Users'}
    },
    supp: {
      _user: { type: Schema.Types.ObjectId, ref: 'Users'}
    },
    sub_one: {
      _user: { type: Schema.Types.ObjectId, ref: 'Users'}
    },
    sub_two: {
      _user: { type: Schema.Types.ObjectId, ref: 'Users'}
    }
  },
  trophies: [{
    name: { type: String, required: true },
    place: Number,
    issued: { type: Date, default: Date.now }
  }],
  creation: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Team', teamSchema)

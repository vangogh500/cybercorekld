/**
 * @apiDefine Team Team
 *
 * @apiDescription This is the Description.
 */


/**
 * @apiDefine teamSchema
 *
 * @apiParam {String} csm CSM account
 */


var mongoose = require('mongoose')
var Schema = mongoose.Schema

var teamSchema = mongoose.Schema({
  name: { type: String, required: true },
  roster: {
    top: {
      _user: { type: Schema.Types.ObjectId, ref: 'Users', required: true}
    },
    jg: {
      _user: { type: Schema.Types.ObjectId, ref: 'Users', required: true}
    },
    mid: {
      _user: { type: Schema.Types.ObjectId, ref: 'Users', required: true}
    },
    adc: {
      _user: { type: Schema.Types.ObjectId, ref: 'Users', required: true}
    },
    supp: {
      _user: { type: Schema.Types.ObjectId, ref: 'Users', required: true}
    },
    sub_1: {
      _user: { type: Schema.Types.ObjectId, ref: 'Users'}
    },
    sub_2: {
      _user: { type: Schema.Types.ObjectId, ref: 'Users'}
    }
  },
  trophies: [{
    name: { type: String, required: true },
    place: Number,
    issued: { type: Date, default: Date.now }
  }],
  creation: { type: Date, default: Date.now },
  matches: [{ type: Schema.Types.ObjectId, ref: 'TournamentMatch'}]
})

module.exports = mongoose.model('Team', teamSchema)

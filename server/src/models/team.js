var mongoose = require('mongoose')

var teamSchema = mongoose.Schema({
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
  }
})

module.exports = mongoose.model('Team', teamSchema)

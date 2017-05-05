var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = mongoose.Schema({
  csm: { type: String, required: true, unique: true },
  lolName: { type: String, unique: true },
  name: String,
  email: String,
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
  creation: { type: Date, default: Date.now, index: true }
})

userSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id  }
});

module.exports = mongoose.model('Users', userSchema)

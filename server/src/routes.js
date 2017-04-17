var credentials = require('./credentials.js')
var jwt = require('jsonwebtoken')

var OneVOneListing = require('./models/onevoneladder.js')
var User = require('./models/user.js')
var LadderMatch = require('./models/laddermatch.js')
var Team = require('./models/team.js')
var Tournament = require('./models/tournament.js')

var elo = require('./lib/elo.js')

function verifyToken(req, res, next) {

  if(req.headers.authorization) {
    var token = req.headers.authorization.slice(7)
    jwt.verify(token, credentials.jwt.secret, function(err, data) {
      if(err) { res.status(401).send() }
      else if(data.user == 'admin') {
        next()
      }
      else {
        res.status(401).send()
      }
    })
  }
  else {
    res.status(401).send()
  }
}

module.exports = function(app) {
  app.post('/api/login', function(req,res) {
    if(req.body.user == credentials.credentials.user && req.body.password == credentials.credentials.password) {
      jwt.sign({ user: 'admin' }, credentials.jwt.secret, { expiresIn: '7 days'}, function(err, token) {
        if(err) {
          res.status(500).send()
        }
        else {
          res.send({token: token, user: 'admin'})
        }
      })
    }
    else {
      res.status(401).send()
    }
  })

  app.post('/api/auth/onevone/user', verifyToken, function(req,res) {
    var newUser = new User({
      csm: req.body.user.csm,
      name: req.body.user.name,
      ign: req.body.user.ign,
      email: req.body.user.email
    })
    var newOneVOneListing = new OneVOneListing({
      _user: newUser._id
    })
    newUser.save(function(err) {
      if(err) { res.status(500).send() }
      else {
        newOneVOneListing.save(function(err) {
          if(err) { res.status(500).send() }
          else { res.send({ userId: newUser._id, entryId: newOneVOneListing._id }) }
        })
      }
    })
  })

  app.delete('/api/auth/onevone/user', verifyToken, function(req,res) {
    if(req.body.password === credentials.credentials.password) {
      OneVOneListing.findOne({ _id: req.body.listingId }, function(err, listing) {
        if(err) res.status(500).send()
        else if(listing) {
          if(listing.matches.length === 0) {
            User.findByIdAndRemove(listing._user, function(err) {
              if(err) res.status(500).send()
              else {
                listing.remove(function(err) {
                  if(err) res.status(500).send()
                  else res.send()
                })
              }
            })
          }
          else {
            res.status(412).send()
          }
        }
        else {
          res.status(404).send()
        }
      })
    }
    else res.status(401).send()
  })

  app.get('/api/auth/onevone/ladder', verifyToken, function(req,res) {
    OneVOneListing.find({}).sort({ kp: -1 }).populate('_user').populate('matches').exec(function(err, ladder) {
      if(err) {
        res.status(500).send()
      }
      else if(ladder) {
        res.send(ladder)
      }
      else {
        res.status(404).send()
      }
    })
  })

  app.get('/api/onevone/matches', function(req,res) {
    LadderMatch.find({}).sort({ date: -1 }).exec(function(err, matches) {
      if(err) {
        res.status(500).send()
      }
      else if(matches) {
        res.send(matches)
      }
      else {
        res.status(404).send()
      }
    })
  })

  app.get('/api/auth/tournaments', function(req,res) {
    console.log("test")
    Tournament.find({}).sort({ date: -1 }).populate('teams').exec(function(err, tournaments) {
      if(err) {
        res.status(500)
      }
      else if(tournaments) {
        console.log(tournaments)
        res.send(tournaments)
      }
      else {
        res.status(404).send()
      }
    })
  })

  app.post('/api/auth/tournament', verifyToken, function(req,res) {
    new Tournament({
      name: req.body.tournament.name,
      date: req.body.tournament.date,
      img: {
        thumbnail: req.body.tournament.thumbnail,
        banner: req.body.tournament.banner
      }
    }).save((err, tournament) => {
      if(err) {
        console.log(err)
        res.status(500).send()
      }
      else res.send({ tournamentId: tournament._id})
    })
  })

  app.post('/api/auth/onevone/match', verifyToken, function(req,res) {
    OneVOneListing.find({ $or: [{ _user: req.body.player_one._user}, { _user: req.body.player_two._user }]}, function(err, listings) {
      if(err) { res.status(500).send() }
      else {
        var kp_one = listings[0].kp
        var kp_two = listings[1].kp

        var d_kp = elo.calculate(kp_one, kp_two, listings[0].matches.length, listings[1].matches.length, ((req.body.winner.value === 'player_one') ? 0 : 1))

        var newMatch = new LadderMatch({
          ladder_type: '1v1',
          player_one: {
            _user: req.body.player_one._user,
            champion: req.body.player_one.champion
          },
          player_two: {
            _user: req.body.player_two._user,
            champion: req.body.player_two.champion
          },
          winner: req.body.winner.value,
          win_condition: req.body.win_condition.value,
          date: req.body.date,
          initial_kp: {
            player_one: kp_one,
            player_two: kp_two
          },
          d_kp
        })
        newMatch.save(function(err) {
          if(err){
            console.log(err)
            res.status(500).send()
          }
          else {
            listings[0].kp = kp_one + d_kp.player_one
            listings[1].kp = kp_two + d_kp.player_two
            listings[0].matches.push(newMatch._id)
            listings[1].matches.push(newMatch._id)
            listings[0].lastGameDate = newMatch.date
            listings[1].lastGameDate = newMatch.date
            listings[0].save(function(error) {
              if(error){
                console.log(error)
                res.status(500).send()
              }
              else {
                listings[1].save(function(e) {
                  if(e){
                    console.log(e)
                    res.status(500).send()
                  }
                  else {
                    res.send({ matchId: newMatch._id, d_kp, listingIds: [listings[0]._id, listings[1]._id] })
                  }
                })
              }
            })
          }
        })
      }
    })
  })
}

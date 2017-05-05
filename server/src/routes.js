var credentials = require('./credentials.js')
var jwt = require('jsonwebtoken')

var OneVOneListing = require('./models/onevoneladder.js')
var User = require('./models/user.js')
var LadderMatch = require('./models/laddermatch.js')
var Team = require('./models/team.js')
var Tournament = require('./models/tournament.js')
var TournamentMatch = require('./models/tournamentMatch.js')
var tournamentLib = require('./lib/tournament.js')
var elo = require('./lib/elo.js')
var Auth = require('./lib/auth.js')

/**
 * @apiDefine admin User access only
 * Allows access to /auth
 */

module.exports = function(app) {

  /**
   * TODO: Don't return username through the response
   * @api {post} /login Authorize Client
   * @apiName Login
   * @apiGroup Authorization
   * @apiPermission none
   *
   * @apiParam {String} username Username
   * @apiParam {String} password Password
   *
   * @apiSuccess {String} token JSON Web Token used for authentication.
   *
   * @apiSuccessExample {Number} Success
   *    200
   * @apiErrorExample {Number} Server Error
   *    500
   * @apiErrorExample {Number} Not Found
   *    404
   *
   */
  app.post('/api/login', function(req,res) {
    console.log(req.body)
    if(req.body.username == credentials.credentials.username && req.body.password == credentials.credentials.password) {
      jwt.sign({ username: 'admin' }, credentials.jwt.secret, { expiresIn: '7 days'}, function(err, token) {
        if(err) {
          res.status(500).send()
        }
        else {
          res.send({token: token, username: 'admin'})
        }
      })
    }
    else {
      res.status(401).send()
    }
  })

  /**
   * TODO: Change request body to not have to include user
   * TODO: Change userId to userid
   * TODO: Change entryId to ladderid
   * TODO: Seperate logic
   * @api {post} /onevone/user Create User and LadderListing
   * @apiName CreateUserAndListing
   * @apiGroup Ladder
   * @apiPermission admin
   *
   * @apiParam {String} csm CSM account
   * @apiParam {String} name Real name
   * @apiParam {String} ign League IGN
   * @apiParam {String} email Email
   *
   * @apiSuccess {String} userid User ID
   * @apiSuccess {String} ladderid Ladder ID
   *
   * @apiErrorExample {Number} Server Error
   *    500
   *
   */
  app.post('/api/auth/onevone/user', Auth.restrict, function(req,res) {
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

  /**
   * TODO: Seperate logic
   * TODO: take in userid
   */
  app.delete('/api/auth/onevone/user', Auth.restrict, function(req,res) {
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

  /**
   * @api {get} /users Get All Users
   * @apiName GetUsers
   * @apiGroup User
   * @apiPermission none
   *
   * @apiSuccess {json[]} users Array of users in order of most recent creation date (user data depends on permission level)
   *
   * @apiErrorExample {Number} Server Error
   *    500
   * @apiErrorExample {Number} Not Found
   *    404
   *
   */
  app.get('/api/users', Auth.checkToken, function(req,res) {
    var Query = User.find({}).sort({ date: -1 })
    if(!req.body.authorized) {
      Query = Query.select({ lolName: 1, name: 1, teams: 1, creation: 1 })
    }
    Query.exec(function(err,users) {
      if(err) {
        res.status(500).send()
      }
      else {
        res.send({ users })
      }
    })
  })

  /**
   * @api {post} /user Add a new user
   * @apiName AddUser
   * @apiGroup User
   * @apiPermission admin
   *
   * @apiParam {String} csm CSM
   * @apiParam {String} [lolname] League ign
   * @apiParam {String} [name] Name
   * @apiParam {String} [email] Email.
   *
   * @apiSuccess {String} id User id
   *
   * @apiErrorExample {Number} Server Error
   *    500
   */
  app.post('/api/auth/user', Auth.restrict, function(req, res) {
    console.log(req)
    new User({
      csm: req.body.csm,
      lolname: req.body.lolname,
      name: req.body.name,
      email: req.body.email
    }).save((err) => {
      if(err) { res.status(500).send() }
      else { res.send({ id: this._id })}
    })
  })

  /**
   * TODO: Check if you want to populate
   * TODO: Change route to ladders
   * TODO: Return in property called ladderentries
   * TODO: Either split logic or return something different depending on auth
   * @api {get} /onevone/ladders Get All Entries
   * @apiName GetLadderEntries
   * @apiGroup Ladder
   * @apiPermission admin
   *
   * @apiSuccess {json[]} ladderentries Ladder Entries in order of descending kp
   *
   * @apiErrorExample {Number} Server Error
   *    500
   * @apiErrorExample {Number} Not Found
   *    404
   *
   */
  app.get('/api/auth/onevone/ladder', Auth.restrict, function(req,res) {
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

  /**
   * TODO: Return in property called matches
   * @api {get} /onevone/matches Get All Matches
   * @apiName GetLadderMatches
   * @apiGroup Ladder
   * @apiPermission none
   *
   * @apiSuccess {json[]} matches Array of matches in order of most recent.
   *
   * @apiErrorExample {Number} Server Error
   *    500
   * @apiErrorExample {Number} Not Found
   *    404
   *
   */
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

  /**
   * TODO: Return in property called tournaments
   * TODO: Check if you want to populate matches
   * @api {get} /tournaments Get All Tournaments
   * @apiName GetTournaments
   * @apiGroup Tournament
   * @apiPermission none
   *
   * @apiSuccess {json[]} tournaments An array of tournaments in order of most recent.
   *
   * @apiErrorExample {Number} Server Error
   *    500
   * @apiErrorExample {Number} Not Found
   *    404
   *
   */
  app.get('/api/auth/tournaments', function(req,res) {
    Tournament.find({}).sort({ date: -1 }).populate('matches').exec(function(err, tournaments) {
      if(err) {
        res.status(500)
      }
      else if(tournaments) {
        tournaments.forEach((tournament) => {
          if(tournament.date < Date.now()) {
            tournament.status = 'completed'
          }
          tournament.save()
        })
        res.send(tournaments)
      }
      else {
        res.status(404).send()
      }
    })
  })

  /**
   * TODO: Return in property called teams
   * @api {get} /teams Get All Teams
   * @apiName GetTeams
   * @apiGroup Team
   * @apiPermission none
   *
   * @apiSuccess {json[]} teams An array of teams ordered by most recent creation date.
   *
   * @apiErrorExample {Number} Server Error
   *    500
   * @apiErrorExample {Number} Not Found
   *    404
   *
   */
  app.get('/api/auth/teams', function(req,res) {
    Team.find({}, function(err, teams) {
      if(err) {
        res.status(500)
      }
      else if(teams) {
        res.send(teams)
      }
      else {
        res.status(404).send
      }
    })
  })

  /**
   * TODO: Change req.body.roster.top => req.body.top
   * TODO: Change teamId to teamid
   * @api {post} /team Create Team
   * @apiName CreateTeam
   * @apiGroup Team
   * @apiPermission none
   *
   * @apiParam {String} name Team name.
   * @apiParam {String} top User ID for top laner.
   * @apiParam {String} jg User ID for jungler.
   * @apiParam {String} mid User ID for mid laner.
   * @apiParam {String} adc User ID for ADC.
   * @apiParam {String} supp User ID for support.
   * @apiParam {String} [sub_1] User ID for substitute 1.
   * @apiParam {String} [sub_2] User ID for substitute 2.
   *
   * @apiSuccess {String} teamid Team ID.
   *
   * @apiErrorExample {Number} Server Error
   *    500
   * @apiErrorExample {Number} Not Found
   *    404
   *
   */
  app.post('/api/auth/team', Auth.restrict, function(req,res) {
    Tournament.findById(req.body.tournamentId, function(err, found) {
      if(err) {
        console.log(err)
        res.status(500).send()
      }
      else if(found) {
        var newTeam = {
          name: req.body.name,
          roster: {
            top: {
              _user: req.body.roster.top
            },
            jg: {
              _user: req.body.roster.jg
            },
            mid: {
              _user: req.body.roster.mid
            },
            adc: {
              _user: req.body.roster.adc
            },
            supp: {
              _user: req.body.roster.supp
            },
            sub_1: {
              _user: req.body.roster.sub_1
            },
            sub_2: {
              _user: req.body.roster.sub_2
            }
          }
        }
        if(!newTeam.roster.sub_1._user) delete newTeam.roster.sub_1
        if(!newTeam.roster.sub_2._user) delete newTeam.roster.sub_2
        new Team(newTeam).save(function(err, team) {
          if(err) {
            console.log(err)
            res.status(500).send()
          }
          else {
            found.teams.push(team._id)
            found.save(function(err) {
              if(err) {
                console.log(err)
                res.status(500).send()
              }
              else {
                res.send({ teamId: team._id })
              }
            })
          }
        })
      }
      else {
        res.status(404).send()
      }
    })
  })

  /**
   * TODO: Change req.body
   * TODO: Change tournamentId to tournamentid
   * @api {post} /team Create Tournament
   * @apiName CreateTournament
   * @apiGroup Tournament
   * @apiPermission none
   *
   * @apiParam {String} name Tournament name.
   * @apiParam {date} date Tournament date.
   * @apiParam {String} [thumbnail] URL to tournament thumbnail.
   * @apiParam {String} [banner] URL to tournament banner.
   * @apiParam {String} [facebook] Facebook link.
   * @apiParam {String} [stream] Stream link.
   *
   * @apiSuccess {String} tournamentid Tournament ID.
   *
   * @apiErrorExample {Number} Server Error
   *    500
   * @apiErrorExample {Number} Not Found
   *    404
   *
   */
  app.post('/api/auth/tournament', Auth.restrict, function(req,res) {
    new Tournament({
      name: req.body.tournament.name,
      date: req.body.tournament.date,
      img: {
        thumbnail: req.body.tournament.thumbnail,
        banner: req.body.tournament.banner
      },
      links: {
        fcbk: req.body.tournament.fcbk,
        stream: req.body.tournament.stream
      }
    }).save((err, tournament) => {
      if(err) {
        console.log(err)
        res.status(500).send()
      }
      else res.send({ tournamentId: tournament._id})
    })
  })

  app.put('/api/auth/tournament/:tournamentId/:status', Auth.restrict, function(req,res) {
    req.params.status = req.params.status.replace("_", " ")
    Tournament.findById(req.params.tournamentId, function(err, found) {
      if(err) {
        res.status(500).send()
      }
      else if(found) {
        found.status = req.params.status
        found.save(function(err) {
          if(err) {
            res.status(500).send()
          }
          else {
            if(req.params.status === 'in progress' && found.matches.length === 0) {
              tournamentLib.initialize(found, (matches) => {
                res.send(matches)
              })
            }
            else {
              res.send([])
            }
          }
        })
      }
      else {
        res.status(404).send()
      }
    })
  })
  /**
   * @api {put} /auth/tournament/match/:id Edit Tournamnent Match
   * @apiName EditTournamentMatch
   * @apiGroup Tournament
   * @apiPermission admin
   *
   * @apiParam {Number} homeScore Score of the home team.
   * @apiParam {Number} visitorScore Score of the visiting team.
   * @apiSuccessExample {Number} Success
   *    200
   * @apiErrorExample {Number} Server Error
   *    500
   * @apiErrorExample {Number} Not Found
   *    404
   *
   */
  app.put('/api/auth/tournament/match/:id', Auth.restrict, function(req,res) {
    const doc = {
      $set: {
        "sides.home.score": {
          score: req.body.homeScore
        },
        "sides.visitor.score": {
          score: req.body.visitorScore
        }
      }
    }
    TournamentMatch.findOneAndUpdate({ _id: req.params.id }, doc).exec(function(err, updated) {
      if(err) {
        res.status(500).send()
      }
      else if(update) {
        res.send()
      }
      else {
        res.status(404).send()
      }
    })
  })

  app.post('/api/auth/onevone/match', Auth.restrict, function(req,res) {
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

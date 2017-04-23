var TournamentMatch = require('../models/tournamentMatch.js')
var Team = require('../models/team.js')
var async = require('async')

const abc = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N']

function shuffleArray(array) {
  var newArray = array.slice()
  for (var i = newArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
}

exports.initialize = function(tournament, cb) {
  const matches = createInitialMatches(tournament)
  const asyncTasks = matches.map((match) => {
    return function(callback) {
      match.save((err) => {
        if(err) {
          console.log(err)
        }
        else {
          callback()
        }
      })
    }
  })
  async.parallel(asyncTasks, () => {
    tournament.matches = matches.map(match => match._id)
    tournament.save((err) => {
      if(err) console.log(err)
      cb(matches)
    })
  })
}

function createInitialMatches(tournament) {
  var prevRound = shuffleArray(tournament.teams)
  const numRounds = Math.ceil(Math.log2(tournament.teams.length))

  var games = []

  for(var i in Array(numRounds).fill("")) {
    const round = prevRound.map((match, idx) => {
      if(idx % 2 === 0) {
        return [ match, (idx+1 < prevRound.length) ? prevRound[idx+1] : null]
      }
      else {
        return null
      }
    }).filter((elem) => elem !== null)
    prevRound = round.map((pair, idx) => {
      if(i != 0 && pair[1] == null) {
        return pair[0]
      }
      else {
        const match = new TournamentMatch({
          name: (i == numRounds -1) ? 'Finals' : abc[i] + (idx + 1),
          scheduled: (i == 0) ? Date.now() : null,
          sides: {
            home: {
              team: {
                id: (i == 0) ? pair[0] : null,
                name: (i == 0) ? null : 'Winner of ' + pair[0].name
              },
              seed: {
                displayName: (i == 0) ? null : 'Winner of ' + pair[0].name,
                sourceGame: (i == 0) ? null : pair[0]._id,
                rank: 1
              }
            },
            visitor: (pair[1] == null) ? null : {
              team: {
                id: (i == 0) ? pair[1] : null,
                name: (i == 0) ? null : 'Winner of ' + pair[1].name
              },
              seed: {
                displayName: (i == 0) ? null : 'Winner of ' + pair[1].name,
                sourceGame: (i == 0) ? null : pair[1]._id,
                rank: 1
              }
            }
          }
        })
        games.push(match)
        if(i == numRounds -1) {
          const losers = new TournamentMatch({
            name: 'Third Place',
            scheduled: null,
            sides: {
              home: {
                team: {
                  id: null,
                  name: 'Loser of ' + pair[0].name
                },
                seed: {
                  displayName: 'Loser of ' + pair[0].name,
                  sourceGame: pair[0]._id,
                  rank: 2
                }
              },
              visitor: {
                team: {
                  id: null,
                  name: 'Loser of ' + pair[1].name
                },
                seed: {
                  displayName: 'Loser of ' + pair[1].name,
                  sourceGame: pair[1]._id,
                  rank: 2
                }
              }
            }
          })
          games.push(losers)
        }
        return match
      }
    })
  }
  return games
}

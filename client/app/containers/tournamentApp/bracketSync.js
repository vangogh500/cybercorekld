import { connect } from 'react-redux'
import Bracket from '../../components/tournamentApp/bracket.js'

const syncMatch = (matchId, state) => {
  const match = state.tournament.matches[matchId]
  const homeTeam = state.tournament.teams[match.sides.home.team.id]
  const visitorTeam = match.sides.visitor ? state.tournament.teams[match.sides.visitor.team.id] : null

  const homeScore = match.sides.home.score ? match.sides.home.score.score : undefined
  const visitorScore = (match.sides.visitor && match.sides.visitor.score) ? match.sides.visitor.score.score : undefined
  const winner = (homeScore && visitorScore) ? ((homeScore > visitorScore) ? match.sides.home.team.id : match.sides.visitor.team.id) : undefined

  var matchSync = {
    ...match,
    scheduled: (new Date(match.scheduled).getTime() / 1000),
    sides: {
      home: {
        ...match.sides.home,
        seed: {
          ...match.sides.home.seed,
          displayName: homeTeam ? homeTeam.name : match.sides.home.seed.displayName
        },
        team: {
          ...match.sides.home.team,
          id: match.sides.home.team.id ? match.sides.home.team.id : matchId + '0',
          name: homeTeam ? homeTeam.name : match.sides.home.team.name
        },
        score: match.sides.home.score ? {
          score: match.sides.home.score.score
        } : undefined
      },
      visitor: match.sides.visitor ? {
        ...match.sides.visitor,
        seed: {
          ...match.sides.visitor.seed,
          displayName: visitorTeam ? visitorTeam.name : match.sides.visitor.seed.displayName
        },
        team: {
          ...match.sides.visitor.team,
          id: match.sides.visitor.team.id ? match.sides.visitor.team.id : matchId + '1',
          name: visitorTeam ? visitorTeam.name : match.sides.visitor.team.name
        },
        score: match.sides.visitor.score ? {
          score: match.sides.visitor.score.score
        } : undefined
      } : null
    },
    winner: winner
  }
  if(matchSync.sides.visitor == null) {
    delete matchSync.sides.visitor
  }
  return matchSync
}

const mapStateToProps = (state, ownProps) => {
  const matchesArray =  ownProps.tournament.matches.map((matchId) => {
    return syncMatch(matchId, state)
  })

  const matchesObj = matchesArray.reduce((acc, match) => {
    acc[match.id] = match
    return acc
  }, {})

  matchesArray.forEach((match) => {
    if(match.sides.home.seed.sourceGame) {
      match.sides.home.seed.sourceGame = matchesObj[match.sides.home.seed.sourceGame]
    }
    if(match.sides.visitor && match.sides.visitor.seed.sourceGame) {
      match.sides.visitor.seed.sourceGame = matchesObj[match.sides.visitor.seed.sourceGame]
    }
  })

  return {
    matches: matchesArray
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Bracket)

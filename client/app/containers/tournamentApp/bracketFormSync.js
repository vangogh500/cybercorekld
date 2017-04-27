import { connect } from 'react-redux'
import BracketForm from '../../components/tournamentApp/bracketForm.js'

const syncMatch = (matchId, state) => {
  const match = state.tournament.matches[matchId]
  const homeTeam = state.tournament.teams[match.sides.home.team.id]
  const visitorTeam = match.sides.visitor ? state.tournament.teams[match.sides.visitor.team.id] : null
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
        }
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
        }
      } : null
    }
  }
  if(matchSync.sides.visitor == null) {
    delete matchSync.sides.visitor
  }
  return matchSync
}

const mapStateToProps = (state, ownProps) => {
  return {
    matches: state.tournament.tournaments[ownProps.tournamentId].matches.map((matchId) => {
      return syncMatch(matchId, state)
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(BracketForm)

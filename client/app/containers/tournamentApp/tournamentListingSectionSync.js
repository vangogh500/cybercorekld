import { connect } from 'react-redux'

import TournamentListingSection from '../../components/tournamentApp/TournamentListingSection.js'

const mapStateToProps = (state, ownProps) => {
  return {
    status: state.tournament.status,
    tournament: {
      ...state.tournament.tournaments[ownProps.params.teamId],
      teams: state.tournament.tournaments[ownProps.params.teamId] ? state.tournament.tournaments[ownProps.params.teamId].teams.map((teamId) => state.tournament.teams[teamId]) : []
    }
  }
}

const mapDispatchToProps = (state, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentListingSection)

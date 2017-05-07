import { connect } from 'react-redux'

import { subscribe } from '../../res/hocs.js'
import TournamentListingApp from '../components/tournamentListingApp.js'

const mapStateToProps = (state, ownProps) => {
  return {
    tournament: state.tournaments.tournaments[ownProps.params.tournamentId],
    selected: ownProps.location.pathname.split(ownProps.params.tournamentId)[1]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const TournamentListingAppSync = connect(mapStateToProps, mapDispatchToProps)(TournamentListingApp)
export default subscribe(TournamentListingAppSync, "tournaments")

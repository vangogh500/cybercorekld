import { connect } from 'react-redux'
import { fetchTournaments, fetchUsers, fetchTeams } from '../../actions/tournament.js'

import TournamentsApp from '../../components/tournamentApp/tournamentsApp.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(fetchTournaments())
      dispatch(fetchTeams())
      dispatch(fetchUsers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsApp)

import { connect } from 'react-redux'
import { toggleTournamentStatusSync } from '../../actions/tournament.js'
import TournamentRightPane from '../../components/tournamentApp/tournamentRightPane.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleStatus: (tournamentId, status, cb) => {
      dispatch(toggleTournamentStatusSync(tournamentId, status, cb))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentRightPane)

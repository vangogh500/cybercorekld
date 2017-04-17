import { connect } from 'react-redux'
import { fetchTournaments } from '../../actions/tournament.js'

import TournamentSection from '../../components/tournamentApp/tournamentSection.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(fetchTournaments())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentSection)

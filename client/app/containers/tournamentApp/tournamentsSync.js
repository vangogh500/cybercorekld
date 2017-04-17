import { connect } from 'react-redux'

import Tournaments from '../../components/tournamentApp/tournaments.js'

const mapStateToProps = (state) => {
  return {
    data: state.tournament.tournamentList.map((tournamentId) => {
      return state.tournament.tournaments[tournamentId]
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tournaments)

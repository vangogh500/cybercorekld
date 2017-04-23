import { connect } from 'react-redux'

import TeamsPage from '../../components/tournamentApp/teamsPage.js'

const mapStateToProps = (state) => {
  return {
    teams: state.tournament.teamList.map((teamId) => state.tournament.teams[teamId])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage)

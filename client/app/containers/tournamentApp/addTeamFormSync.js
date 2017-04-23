import { connect } from 'react-redux'
import { addTeamToTournament } from '../../actions/tournament.js'

import AddTeamForm from '../../components/tournamentApp/addTeamForm.js'

const mapStateToProps = (state) => {
  return {
    userStatus: state.tournament.users.status,
    users: state.tournament.users.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (team, cb) => {
      dispatch(addTeamToTournament(team, cb))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTeamForm)

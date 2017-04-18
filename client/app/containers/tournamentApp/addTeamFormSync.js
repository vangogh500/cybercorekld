import { connect } from 'react-redux'

import AddTeamForm from '../../components/tournamentApp/addTeamForm.js'

const mapStateToProps = (state) => {
  return {
    userStatus: state.tournament.users.status,
    users: Object.keys(state.tournament.users.users).map((key) => state.tournament.users.users[key])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTeamForm)

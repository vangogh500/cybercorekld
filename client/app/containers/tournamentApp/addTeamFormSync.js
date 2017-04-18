import { connect } from 'react-redux'

import AddTeamForm from '../../components/tournamentApp/addTeamForm.js'

const mapStateToProps = (state) => {
  return {
    userStatus: state.tournament.users.status,
    users: state.tournament.users.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTeamForm)

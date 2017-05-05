import { connect } from 'react-redux'
import UsersApp from '../components/usersApp.js'

import { fetchUsers } from '../actions.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => dispatch(fetchUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersApp)

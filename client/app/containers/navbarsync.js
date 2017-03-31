import { connect } from 'react-redux'
import Navbar from '../components/navbar.js'
import { logout } from '../actions/authorization.js'

const mapStateToProps = (state) => {
  return {
    status: state.authorization.status,
    user: state.authorization.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

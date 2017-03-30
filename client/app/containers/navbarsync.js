import { connect } from 'react-redux'
import Navbar from '../components/navbar.js'
import { logout } from '../actions/credentials.js'

const mapStateToProps = (state) => {
  return {
    status: state.credentials.status,
    user: state.credentials.user
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

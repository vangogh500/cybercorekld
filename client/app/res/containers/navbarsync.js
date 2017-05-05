import { connect } from 'react-redux'
import Navbar from '../components/navbar.js'
import { logout } from '../../authorization/actions.js'

const mapStateToProps = (state) => {
  return {
    status: state.auth.status,
    username: state.auth.username
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

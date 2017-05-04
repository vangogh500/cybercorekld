import { connect } from 'react-redux'
import AuthForm from '../components/authForm.js'
import { loginFromServer } from '../actions.js'

const mapStateToProps = (state) => {
  return {
    status: state.auth.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (username, password) => {
      dispatch(loginFromServer(username, password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)

import { connect } from 'react-redux'
import AuthForm from '../components/authForm.js'
import { loginFromServer } from '../../actions/authorization.js'

const mapStateToProps = (state) => {
  return {
    status: state.authorization.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (creds) => {
      dispatch(loginFromServer(creds.user, creds.password))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)

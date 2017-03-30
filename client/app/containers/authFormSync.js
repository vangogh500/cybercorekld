import { connect } from 'react-redux'
import AuthForm from '../components/authForm'
import { login } from '../actions/credentials.js'

const mapStateToProps = (state) => {
  return {
    status: state.credentials.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (creds, cb) => {
      dispatch(login(creds, cb))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)

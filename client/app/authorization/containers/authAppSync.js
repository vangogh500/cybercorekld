import { connect } from 'react-redux'
import AuthApp from '../components/authApp.js'

const mapStateToProps = (state) => {
  return {
    status: state.auth.status
  }
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthApp)

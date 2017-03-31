import { connect } from 'react-redux'
import AuthSection from '../components/authSection.js'

const mapStateToProps = (state) => {
  return {
    status: state.authorization.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthSection)

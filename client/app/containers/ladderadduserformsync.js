import { connect } from 'react-redux'

import { addToLadder } from '../actions/ladder.js'
import LadderAddUserForm from '../components/ladderadduserform.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (user, cb) => {
      user.kp = 1000
      dispatch(addToLadder(user, cb))
    }
  }
}

const LadderAddUserFormSync = connect(mapStateToProps, mapDispatchToProps)(LadderAddUserForm)
export default LadderAddUserFormSync

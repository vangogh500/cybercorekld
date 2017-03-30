import { connect } from 'react-redux'

import { addEntryToLadder } from '../actions/ladder.js'
import LadderAddUserForm from '../components/ladderadduserform.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (user, cb) => {
      dispatch(addEntryToLadder(user, cb))
    }
  }
}

const LadderAddUserFormSync = connect(mapStateToProps, mapDispatchToProps)(LadderAddUserForm)
export default LadderAddUserFormSync

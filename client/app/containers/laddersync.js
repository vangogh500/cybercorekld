import { connect } from 'react-redux'

import { fetchLadder } from '../actions/ladder.js'
import Ladder from '../components/ladder.js'

const mapStateToProps = (state) => {
  return {
    data: state.ladder.data,
    status: state.ladder.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(fetchLadder())
    }
  }
}

const LadderSync = connect(mapStateToProps, mapDispatchToProps)(Ladder)

export default LadderSync

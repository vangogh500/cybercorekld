import { connect } from 'react-redux'

import { fetchLadder } from '../actions/ladder.js'
import Ladder from '../components/ladder.js'

const mapStateToProps = (state) => {
  console.log(state.ladder.ladder.map((id) => {
    state.ladder.ladderEntries[id]
  }))
  return {
    data: state.ladder.data,
    status: state.ladder.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const LadderSync = connect(mapStateToProps, mapDispatchToProps)(Ladder)

export default LadderSync

import { connect } from 'react-redux'

import { fetchLadder } from '../actions/ladder.js'
import Ladder from '../components/ladder.js'

const mapStateToProps = (state) => {
  var ladder = state.ladder.ladder.map((id) => {
    var entry = state.ladder.ladderEntries[id]
    return Object.assign({}, entry,{ _user: state.ladder.users[entry._user] })
  })

  return {
    data: ladder,
    status: state.ladder.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const LadderSync = connect(mapStateToProps, mapDispatchToProps)(Ladder)

export default LadderSync

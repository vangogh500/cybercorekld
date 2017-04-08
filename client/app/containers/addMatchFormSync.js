import { connect } from 'react-redux'

import { addMatchToLadder } from '../actions/ladder.js'
import LadderAddMatchForm from '../components/ladderaddmatchform.js'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (match, cb) => {
      dispatch(addMatchToLadder(match, cb))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LadderAddMatchForm)

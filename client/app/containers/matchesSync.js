import { connect } from 'react-redux'

import Matches from '../components/matches.js'

const mapStateToProps = (state) => {
  console.log(state)
  return {
    users: state.ladder.users,
    champions: state.ladder.champions,
    matches: state.ladder.matches,
    ladderMatches: state.ladder.ladderMatches,
    status: state.ladder.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Matches)

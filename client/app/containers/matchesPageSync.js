import { connect } from 'react-redux'

import MatchesPage from '../matchesPage.js'

const mapStateToProps = (state) => {
  return {
    users: state.ladder.users,
    champions: state.ladder.champions,
    matches: state.ladder.matches,
    ladderMatches: state.ladder.ladderMatches
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchesPage)

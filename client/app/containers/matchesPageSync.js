import { connect } from 'react-redux'

import MatchesPage from '../matchesPage.js'

const mapStateToProps = (state) => {
  console.log(state)
  return {
    users: state.ladder.users,
    champions: state.ladder.champions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchesPage)

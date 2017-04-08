import { connect } from 'react-redux'

import MatchesPage from '../matchesPage.js'

const mapStateToProps = (state) => {
  return {
    users: state.ladder.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchesPage)

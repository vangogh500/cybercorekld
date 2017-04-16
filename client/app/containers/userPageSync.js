import { connect } from 'react-redux'

import UserPage from '../userPage.js'
import { removeListingAndUserFromLadder } from '../actions/ladder.js'

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.ladder.users,
    champions: state.ladder.champions,
    ladderEntry: {
      ...state.ladder.ladderEntries[ownProps.params.userId],
      _user: state.ladder.ladderEntries[ownProps.params.userId] ? state.ladder.users[state.ladder.ladderEntries[ownProps.params.userId]._user] : {},
      matches: state.ladder.ladderEntries[ownProps.params.userId] ? state.ladder.ladderEntries[ownProps.params.userId].matches.map((matchId) => {
        return state.ladder.matches[matchId]
      }) : []
    },
    status: state.ladder.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (password, listingId, cb) => {
      dispatch(removeListingAndUserFromLadder(password, listingId, cb))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)

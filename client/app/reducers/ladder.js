import { FETCH_LADDER, ADD_ENTRY } from '../actions/ladder.js'
import { normalizeLadderEntries } from '../normalizer.js'

export function ladder(state = {
  status: 0,
  ladder: [],
  ladderEntries: {},
  users: {}
}, action) {
  switch(action.type) {
    case FETCH_LADDER:
      var nextState = Object.assign({}, state, {
        status: action.status
      })
      if(action.status === 200) {
        var normalized = normalizeLadderEntries(action.data)
        nextState = Object.assign(nextState, normalized.entities, normalized.result)
      }
      return nextState
    case ADD_ENTRY:
      var nextState = Object.assign({}, state, {})
      nextState.ladderEntries[action.entry._id] = action.entry
      nextState.users[action.user._id] = action.user
      return nextState
    default:
      return state
  }
}

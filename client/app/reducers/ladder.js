import { FETCH_LADDER, ADD_ENTRY, FETCH_CHAMPIONS, ADD_MATCH } from '../actions/ladder.js'
import { normalizeLadderEntries } from '../normalizer.js'

export function ladder(state = {
  status: 0,
  ladder: [],
  ladderEntries: {},
  users: {},
  champions: {},
  ladderMatches: [],
  matches: {}
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
      var nextState = Object.assign({}, state)
      nextState.ladderEntries[action.entry._id] = action.entry
      nextState.users[action.user._id] = action.user
      nextState.ladder.push(action.entry_id)
      return nextState
    case ADD_MATCH:
      var nextState = Object.assign({}, state)
      nextState.matches[action.match._id] = action.match
      var entry_one = nextState.ladderEntries[action.listingIds[0]]
      var entry_two = nextState.ladderEntries[action.listingIds[1]]
      entry_one.kp = entry_one.kp + action.d_kp.player_one
      entry_two.kp = entry_two.kp + action.d_kp.player_two
      entry_one.matches.push(action.match._id)
      entry_two.matches.push(action.match_id)
      nextState.ladderMatches.push(action.match_id)
      return nextState
    case FETCH_CHAMPIONS:
      return Object.assign({}, state, { champions: action.data })
    default:
      return state
  }
}

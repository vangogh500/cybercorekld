import { FETCH_LADDER, ADD_ENTRY, FETCH_CHAMPIONS, FETCH_MATCHES, ADD_MATCH } from '../actions/ladder.js'
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
        var ladderMatches = Object.keys(nextState.matches).map((key) => { return key })
        ladderMatches.sort((a,b) => {
          a = new Date(nextState.matches[a].date)
          b = new Date(nextState.matches[b].date)
          return (a > b) ? -1 : (a < b) ? 1 : 0
        })
        nextState.ladderMatches = ladderMatches
      }
      return nextState
    case ADD_ENTRY:
      var newState = {
        ...state,
        ladderEntries: {
          ...state.ladderEntries,
          [action.entry.id]: action.entry
        },
        users: {
          ...state.users,
          [action.user.id]: action.user
        },
        ladder: [...state.ladder, action.entry.id].sort((a,b) => {
          if(b === action.entry.id) b = action.entry
          else b = state.ladderEntries[b].kp
          if(a === action.entry.id) a = action.entry
          else a = state.ladderEntries[a].kp
          return b - a
        })
      }
      console.log(newState)
      return newState
    case ADD_MATCH:
      console.log(action)
      var newState = {
        ...state,
        matches: {
          ...state.matches,
          [action.match.id]: action.match
        },
        ladderEntries: {
          ...state.ladderEntries,
          [action.listingIds[0]]: {
            ...state.ladderEntries[action.listingIds[0]],
            kp: state.ladderEntries[action.listingIds[0]].kp + action.d_kp.player_one,
            matches: [ ...state.ladderEntries[action.listingIds[0]].matches, action.match.id]
          },
          [action.listingIds[1]]: {
            ...state.ladderEntries[action.listingIds[1]],
            kp: state.ladderEntries[action.listingIds[1]].kp + action.d_kp.player_two,
            matches: [ ...state.ladderEntries[action.listingIds[1]].matches, action.match.id]
          }
        },
        ladderMatches: [ action.match.id, ...state.ladderMatches ]
      }
      return newState
    case FETCH_CHAMPIONS:
      return Object.assign({}, state, { champions: action.data })
    default:
      return state
  }
}

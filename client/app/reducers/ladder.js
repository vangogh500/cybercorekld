import { FETCH_LADDER, ADD_ENTRY, FETCH_CHAMPIONS, FETCH_MATCHES, ADD_MATCH, REMOVE_LISTING_AND_USER } from '../actions/ladder.js'
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
      return newState
    case ADD_MATCH:
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
            kp: state.ladderEntries[action.listingIds[0]].kp + action.match.d_kp.player_one,
            matches: [ ...state.ladderEntries[action.listingIds[0]].matches, action.match.id]
          },
          [action.listingIds[1]]: {
            ...state.ladderEntries[action.listingIds[1]],
            kp: state.ladderEntries[action.listingIds[1]].kp + action.match.d_kp.player_two,
            matches: [ ...state.ladderEntries[action.listingIds[1]].matches, action.match.id]
          }
        },
        ladderMatches: [ action.match.id, ...state.ladderMatches ]
      }
      return newState
    case REMOVE_LISTING_AND_USER:
      return {
        ...state,
        ladderEntries: Object.keys(state.ladderEntries).reduce((result, key) => {
          if(key !== action.listingId) {
            result[key] = state.ladderEntries[key]
          }
          return result
        }, {}),
        ladder: state.ladder.filter((entryId) => {
          return entryId !== action.listingId
        }),
        users: Object.keys(state.users).reduce((result, key) => {
          if(key !== state.ladderEntries[action.listingId]._user) {
            result[key] = state.users[key]
          }
          return result
        }, {})
      }

    case FETCH_CHAMPIONS:
      return Object.assign({}, state, { champions: action.data })
    default:
      return state
  }
}

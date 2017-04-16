import { FETCH_LADDER, ADD_ENTRY, FETCH_CHAMPIONS, FETCH_MATCHES, ADD_MATCH, REMOVE_LISTING_AND_USER } from '../actions/ladder.js'
import { normalizeLadderEntries } from '../normalizer.js'

function ladder(state = [], action, ladderApp) {
  switch(action.type) {
    case FETCH_LADDER:
      if(action.status === 200) return action.data.result.ladder
      else return state
    case ADD_ENTRY:
      return [...state, action.entry.id].sort((a,b) => {
        if(b === action.entry.id) b = action.entry.kp
        else b = ladderApp.ladderEntries[b].kp
        if(a === action.entry.id) a = action.entry.kp
        else a = ladderApp.ladderEntries[a].kp
        return b - a
      })
    case REMOVE_LISTING_AND_USER:
      return state.filter((entryId) => {
        return entryId !== action.listingId
      })
    default:
      return state
  }
}

function ladderEntries(state = {}, action) {
  switch(action.type) {
    case FETCH_LADDER:
      if(action.status === 200) return action.data.entities.ladderEntries
      else return state
    case ADD_ENTRY:
      return {
        ...state,
        [action.entry.id]: action.entry
      }
    case ADD_MATCH:
      console.log({
        ...state,
        [action.listingIds[0]]: {
          ...state[action.listingIds[0]],
          kp: state[action.listingIds[0]].kp + action.match.d_kp.player_one,
          matches: [ ...state[action.listingIds[0]].matches, action.match.id]
        },
        [action.listingIds[1]]: {
          ...state[action.listingIds[1]],
          kp: state[action.listingIds[1]].kp + action.match.d_kp.player_two,
          matches: [ ...state[action.listingIds[1]].matches, action.match.id]
        }
      })
      return {
        ...state,
        [action.listingIds[0]]: {
          ...state[action.listingIds[0]],
          kp: state[action.listingIds[0]].kp + action.match.d_kp.player_one,
          matches: [ ...state[action.listingIds[0]].matches, action.match.id]
        },
        [action.listingIds[1]]: {
          ...state[action.listingIds[1]],
          kp: state[action.listingIds[1]].kp + action.match.d_kp.player_two,
          matches: [ ...state[action.listingIds[1]].matches, action.match.id]
        }
      }
    case REMOVE_LISTING_AND_USER:
      return Object.keys(state).reduce((result, key) => {
        if(key !== action.listingId) {
          result[key] = state[key]
        }
        return result
      }, {})
    default:
      return state
  }
}

function users(state = {}, action, ladderApp) {
  switch(action.type) {
    case FETCH_LADDER:
      if(action.status === 200) return action.data.entities.users
      else return state
    case ADD_ENTRY:
      return {
        ...state,
        [action.user.id]: action.user
      }
    case REMOVE_LISTING_AND_USER:
      return Object.keys(state).reduce((result, key) => {
        if(key !== ladderApp.ladderEntries[action.listingId]._user) {
          result[key] = state[key]
        }
        return result
      }, {})
    default:
      return state
  }
}

function matches(state = {}, action, ladderApp) {
  switch(action.type) {
    case FETCH_LADDER:
      if(action.status === 200) return action.data.entities.matches
      else return state
    case ADD_MATCH:
      return {
        ...state,
        [action.match.id]: {
          ...action.match,
          initial_kp: {
            player_one: ladderApp.ladderEntries[action.listingIds[0]].kp,
            player_two: ladderApp.ladderEntries[action.listingIds[1]].kp
          }
        }
      }
    default:
      return state
  }
}

function ladderMatches(state = [], action) {
  switch(action.type) {
    case FETCH_LADDER:
      if(action.status === 200) return Object.keys(action.data.entities.matches).map((key) => {
          return key
        }).sort((a,b) => {
          a = new Date(action.data.entities.matches[a].date)
          b = new Date(action.data.entities.matches[b].date)
          return (a > b) ? -1 : (a < b) ? 1 : 0
        })
      else return state
    case ADD_MATCH:
      return [ action.match.id, ...state ]
    default:
      return state
  }
}

function champions(state = {}, action) {
  switch(action.type) {
    case FETCH_CHAMPIONS:
      return action.data
    default:
      return state
  }
}

function status(state = 0, action) {
  switch(action.type) {
    case FETCH_LADDER:
      return action.status
    default:
      return state
  }
}

export function ladderApp(state = {}, action) {
  return {
    status: status(state.status, action),
    ladder: ladder(state.ladder, action, state),
    ladderEntries: ladderEntries(state.ladderEntries, action),
    users: users(state.users, action, state),
    champions: champions(state.champions, action),
    ladderMatches: ladderMatches(state.ladderMatches, action),
    matches: matches(state.matches, action, state)
  }
}

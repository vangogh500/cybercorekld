import { FETCH_LADDER, REQUEST } from '../actions/ladder.js'
import { combineReducers } from 'redux'

function ladder(state = {
  isFetching = false,
  ladder = []
}, action) {
  switch(action.type) {
    case FETCH_LADDER:
      switch(action.status) {
        case REQUEST:
          return Object.assign({}, state, {
            isFetching: true
          })
        case 200:
          return Object.assign({}, state, {
            isFetching: false,
            ladder: action.ladder
          })
        default:
          return Object.assign({}, state, {
            isFetching: false
          })
      }
    default:
      return state
  }
}

let rootReducer = combineReducers({
  ladder
})

export default rootReducer

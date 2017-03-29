import { FETCH_LADDER } from '../actions/ladder.js'
import { combineReducers } from 'redux'

function ladder(state = {
  status: 0,
  data: []
}, action) {
  switch(action.type) {
    case FETCH_LADDER:
      return Object.assign({}, state, {
        status: action.status,
        data: action.data
      })
    default:
      return state
  }
}

let rootReducer = combineReducers({
  ladder
})

export default rootReducer

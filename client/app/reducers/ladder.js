import { FETCH_LADDER, ADD_ENTRY } from '../actions/ladder.js'
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
    case ADD_ENTRY:
      return Object.assign({}, state, {
        data: [...state.data, action.entry ]
      })
    default:
      return state
  }
}

let rootReducer = combineReducers({
  ladder
})

export default rootReducer

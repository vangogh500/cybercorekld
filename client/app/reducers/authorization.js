import { FETCH_TOKEN, STATUS_REQUEST } from '../actions/authorization.js'

export function authorization(state = {
  status: -1,
  user: '',
  token: ''
}, action) {
  switch(action.type) {
    case FETCH_TOKEN:
      return Object.assign({}, state, {
        status: action.status,
        user: action.user,
        token: action.token
      })
    default:
      return state
  }
}

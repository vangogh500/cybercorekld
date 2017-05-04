import { FETCH_TOKEN } from './actions.js'
import {STATUS_PREREQUEST} from '../res/numbers.js'

function status(state = STATUS_PREREQUEST, action) {
  switch(action.type) {
    case FETCH_TOKEN:
      return action.status
    default:
      return state
  }
}

function username(state = '', action) {
  switch(action.type) {
    case FETCH_TOKEN:
      return action.user
    default:
      return state
  }
}

function token(state = '', action) {
  switch(action.type) {
    case FETCH_TOKEN:
      return action.token
    default:
      return state
  }
}

/**
 * Reducer for authorization
 * @param {Object} state Current state
 * @param {Object} action Action
 * @return {Object} New state
 * @property {Number} status=-1 Status of the login
 * @property {String} username="" Username
 * @property {String} token="" Token for credentials
 */
export function authReducer(state = {}, action) {
  return {
    status: status(state.status, action),
    username: username(state.username, action),
    token: token(state.token, action)
  }
}

import { FETCH_USERS, ADD_USER } from './actions.js'
import {STATUS_PREREQUEST, STATUS_SUCCESS } from '../res/numbers.js'

function status(state = STATUS_PREREQUEST, action) {
  switch(action.type) {
    case FETCH_USERS:
      return action.status
    case ADD_USER:
      return action.status
    default:
      return state
  }
}

function users(state = {}, action) {
  switch(action.type) {
    case FETCH_USERS:
      return (action.status == STATUS_SUCCESS) ? action.users : state
    case ADD_USER:
      return {
        [action.user.id]: action.user,
        ...state
      }
    default:
      return state
  }
}

function userList(state = [], action) {
  switch(action.type) {
    case FETCH_USERS:
      return (action.status == STATUS_SUCCESS) ? action.userList : state
    case ADD_USER:
      return [
        action.user.id,
        ...state
      ]
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
 * @property {String} users={} Users
 */
export function usersApp(state = {}, action) {
  return {
    status: status(state.status, action),
    users: users(state.users, action),
    userList: userList(state.userList, action)
  }
}

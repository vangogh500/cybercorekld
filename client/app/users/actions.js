import fetch from 'isomorphic-fetch'

import {STATUS_REQUEST} from '../res/numbers.js'
import { resolve } from '../res/util.js'

/**
 * Action type for fetching users
 * @typedef {String} FETCH_USERS
 */
export const FETCH_USERS = 'FETCH_USERS'
/**
 * Action type for adding user
 * @typedef {String} ADD_USER
 */
export const ADD_USER = 'ADD_USER'

function requestUsers() {
  return {
    type: FETCH_USERS,
    status: STATUS_REQUEST
  }
}

function requestResponse(status, users) {
  return {
    type: FETCH_USERS,
    status,
    users
  }
}

function addUserResponse(status, user) {
  return {
    type: ADD_USER,
    status,
    user
  }
}

/**
 * Fetch users from the server
 * @emits {FETCH_USERS} To signify a request
 * @emits {FETCH_USERS} To signify a response
 * @return {Function} Dispatch function
 */
export function fetchUsers() {
  return function(dispatch, getState) {
    dispatch(requestUsers())
    return fetch('http://localhost:3000/api/users', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + getState().auth.token
      }
    }).then(response => resolve(response, (status, data) => {
        dispatch(requestResponse(status, data ? data.users : null))
    }))
  }
}

/**
 * Add user to the server
 * @param {Object} formContent Form content (csm is required)
 * @param {Function} cb Call back (response status)
 * @emits {FETCH_USERS} To signify a request
 * @emits {ADD_USER} To signify successful response
 * @emits {FETCH_USERS} To signify failed response
 * @return {Function} Dispatch function
 */
export function addUserToServer(formContent, cb) {
  return function(dispatch, getState) {
    console.log("server call")
    dispatch(requestUsers())
    return fetch('http://localhost:3000/api/auth/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().auth.token
      },
      body: JSON.stringify(formContent)
    }).then(response => resolve(response, (status, data) => {
      cb(status)
      if(data) {
        formContent.id = data.id
        dispatch(addUserResponse(status, formContent))
      }
      else {
        dispatch(requestResponse(status, []))
      }
    }))
  }
}

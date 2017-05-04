import fetch from 'isomorphic-fetch'

import {STATUS_REQUEST} from '../res/numbers.js'

/**
 * Action type for fetching authorization
 * @typedef {String} FETCH_TOKEN
 */
export const FETCH_TOKEN = 'FETCH_TOKEN'

function requestLogin() {
  return {
    type: FETCH_TOKEN,
    status: STATUS_REQUEST
  }
}

function loginResponse(status, username, token) {
  return {
    type: FETCH_TOKEN,
    status,
    username,
    token
  }
}

function resolve(response, cb) {
  response.json().then(json =>
    cb(response.status, json)
  )
}

/**
 * Fetch authorization from server using credentials
 * @param {String} username username
 * @param {String} password password
 * @emits {FETCH_TOKEN} To signify a login request has initiated
 * @emits {FETCH_TOKEN} To signify a login response
 * @return {Function} Dispatch function
 */
export function loginFromServer(username, password) {
  return function(dispatch) {
    dispatch(requestLogin())

    return fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }).then(response => {
      if(response.status !== 200) { dispatch(loginResponse(response.status, null, null)) }
      else {
        resolve(response, (status, data) => {
          if(typeof(Storage) !== 'undefined') {
            window.sessionStorage.setItem('username', data.username)
            window.sessionStorage.setItem('token', data.token)
          }
          dispatch(loginResponse(status, data.username, data.token))
        })
      }
    })

  }
}

/**
 * Fetch authorization from local storag
 * @emits {FETCH_TOKEN} To signify a login response
 * @return {Function} Dispatch function
 */
export function loginFromStorage() {
  return function(dispatch) {
    if(typeof(Storage) !== 'undefined') {
      if(window.sessionStorage.username && window.sessionStorage.token) {
        dispatch(loginResponse(200, window.sessionStorage.getItem('username'), window.sessionStorage.getItem('token')))
      }
    }
  }
}

/**
 * Logout and delete credentials
 * @emits {FETCH_TOKEN} To signify a logout response
 * @return {Function} Dispatch function
 */
export function logout() {
  return function(dispatch) {
    if(typeof(Storage) !== 'undefined') {
      if(window.sessionStorage.username) {
        window.sessionStorage.removeItem('username')
      }
      if(window.sessionStorage.token) {
        window.sessionStorage.removeItem('token')
      }
    }
    dispatch(loginResponse(-1, '', ''))
  }
}

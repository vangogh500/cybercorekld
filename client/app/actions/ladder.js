import fetch from 'isomorphic-fetch'

export const FETCH_LADDER = 'FETCH_LADDER'
export const STATUS_REQUEST = 0
export const ADD_USER = 'ADD_USER'

function requestLadder() {
  return {
    type: FETCH_LADDER,
    status: STATUS_REQUEST
  }
}

function receiveLadder(status, json) {
  return {
    type: FETCH_LADDER,
    status,
    data: json
  }
}

function addUser(user) {
  return {
    type: ADD_USER,
    user
  }
}

function resolve(response, cb) {
  response.json().then(json =>
    cb(response.status, json)
  )
}

export function fetchLadder() {
  return function(dispatch) {
    dispatch(requestLadder())

    return fetch('http://localhost:3000/api/onevone/ladder')
      .then(response => resolve(response, (status, data) => {
        dispatch(receiveLadder(status, data))
      }))
  }
}

export function addToLadder(user, cb) {
  return function(dispatch) {
    return fetch('http://localhost:3000/api/onevone/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: user })
    }).then(response => resolve(response, (status, data) => {
        cb(status)
        var newUser = Object.assign({}, user, data)
        dispatch(addUser(newUser))
      }))
  }
}

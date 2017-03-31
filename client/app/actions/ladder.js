import fetch from 'isomorphic-fetch'

export const FETCH_LADDER = 'FETCH_LADDER'
export const STATUS_REQUEST = 0
export const ADD_ENTRY = 'ADD_ENTRY'

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

function addEntry(entry) {
  return {
    type: ADD_ENTRY,
    entry
  }
}

function resolve(response, cb) {
  if(response.status !== 200) { cb(response.status, null) }
  else {
    response.json().then(json =>
      cb(response.status, json)
    )
  }
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

export function addEntryToLadder(user, cb) {
  return function(dispatch) {
    return fetch('http://localhost:3000/api/auth/onevone/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: user })
    }).then(response => resolve(response, (status, data) => {
        cb(status)
        var newUser = Object.assign({}, user, { _id: data.userId })
        var newEntry = {
          _id: data.entryId,
          _user: newUser,
          kp: 1000
        };
        dispatch(addEntry(newEntry))
      }))
  }
}

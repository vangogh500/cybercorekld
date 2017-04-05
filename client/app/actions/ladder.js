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

function receiveLadder(status, data) {
  return {
    type: FETCH_LADDER,
    status,
    data
  }
}

function addEntry(entry, user) {
  return {
    type: ADD_ENTRY,
    entry,
    user
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
  return function(dispatch, getState) {
    dispatch(requestLadder())

    return fetch('http://localhost:3000/api/auth/onevone/ladder', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + getState().authorization.token
      }
    })
      .then(response => resolve(response, (status, data) => {
        data.forEach((entry) => {
          entry.id = entry._id
          delete entry._id
          entry._user.id = entry._user._id
          delete entry._user._id
        })
        dispatch(receiveLadder(status, {
          ladder: data}
        ))
      }))
  }
}

export function addEntryToLadder(user, cb) {
  return function(dispatch, getState) {
    return fetch('http://localhost:3000/api/auth/onevone/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().authorization.token
      },
      body: JSON.stringify({ user: user })
    }).then(response => resolve(response, (status, data) => {
        cb(status)
        var newUser = Object.assign({}, user, { _id: data.userId })
        var newEntry = {
          _id: data.entryId,
          _user: newUser._id,
          kp: 1000
        };
        dispatch(addEntry(newEntry, newUser))
      }))
  }
}

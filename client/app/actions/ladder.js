import fetch from 'isomorphic-fetch'

export const FETCH_LADDER = 'FETCH_LADDER'
export const STATUS_REQUEST = 0

function requestLadder() {
  return {
    type: FETCH_LADDER,
    status: STATUS_REQUEST
  }
}

function receiveLadder(status, json) {
  return {
    type: FETCH_LADDER,
    status: status,
    data: json
  }
}

export function fetchLadder() {
  return function(dispatch) {
    dispatch(requestLadder())

    function resolve(response) {
      response.json().then(json =>
        dispatch(receiveLadder(response.status, json))
      )
    }

    return fetch('http://localhost:3000/api/onevone/ladder')
      .then(response => resolve(response))
  }
}

export function addToLadder(user) {
  return function(dispatch) {
    dispatch(requestLadder())

    return fetch('http://localhost:3000/api/onevone/user', { method: 'POST', body: { user: user }})
      .then(response => {
        dispatch()
        dispatch(receiveLadder(response.status))
      })
  }
}

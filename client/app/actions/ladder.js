import fetch from 'isomorphic-fetch'

export const FETCH_LADDER = 'FETCH_LADDER'
export const REQUEST = 'REQUEST'

function requestLadder() {
  return {
    type: FETCH_LADDER,
    status: REQUEST
  }
}

function receiveLadder(status, json) {
  return {
    type: FETCH_LADDER,
    status: status,
    ladder: json
  }
}

function fetchLadder() {
  return function(dispatch) {
    dispatch(requestLadder())
    return fetch('http://localhost:3000/api/onevone/ladder')
  }
}

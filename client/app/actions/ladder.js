import fetch from 'isomorphic-fetch'

export const FETCH_LADDER = 'FETCH_LADDER'
export const STATUS_REQUEST = 0
export const ADD_ENTRY = 'ADD_ENTRY'

export const FETCH_CHAMPIONS = 'FETCH_CHAMPIONS'
export const ADD_MATCH = 'ADD_MATCH'

function requestLadder() {
  return {
    type: FETCH_LADDER,
    status: STATUS_REQUEST
  }
}

function requestChampions() {
  return {
    type: FETCH_CHAMPIONS,
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

function receiveChampions(status, data) {
  return {
    type: FETCH_CHAMPIONS,
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
function addMatch(match, d_kp, listingIds) {
  return {
    type: ADD_MATCH,
    match,
    d_kp,
    listingIds
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

export function fetchChampions() {
  return function(dispatch, getState) {
    dispatch(requestChampions())
    return fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json')
      .then(response => resolve(response, (status, data) => {
        Object.keys(data.data).forEach((key) => {
          delete data.data[key].blurb
          delete data.data[key].info
          delete data.data[key].partype
          delete data.data[key].tags
          delete data.data[key].version
          delete data.data[key].stats
          delete data.data[key].title
        })
        dispatch(receiveChampions(status, data.data))
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

export function addMatchToLadder(match, cb) {
  return function(dispatch, getState) {
    return fetch('http://localhost:3000/api/auth/onevone/match', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().authorization.token
      },
      body: JSON.stringify(match)
    }).then(response => resolve(response, (status, data) => {
        cb(status)
        var newMatch = Object.assign({}, match, { _id: data.matchId })
        dispatch(addMatch(newMatch, data.d_kp, data.listingIds))
      }))
  }
}

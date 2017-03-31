import fetch from 'isomorphic-fetch'

export const FETCH_TOKEN = 'FETCH_TOKEN'
export const STATUS_REQUEST = 0

function requestLogin() {
  return {
    type: FETCH_TOKEN,
    status: STATUS_REQUEST
  }
}

function loginResponse(status, user, token) {
  return {
    type: FETCH_TOKEN,
    status,
    user,
    token
  }
}

function resolve(response, cb) {
  response.json().then(json =>
    cb(response.status, json)
  )
}

export function loginFromServer(user, password) {
  return function(dispatch) {
    dispatch(requestLogin())

    return fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, password })
    }).then(response => {
      if(response.status !== 200) { dispatch(loginResponse(response.status, null, null)) }
      else {
        resolve(response, (status, data) => {
          if(typeof(Storage) !== 'undefined') {
            window.sessionStorage.setItem('user', data.user)
            window.sessionStorage.setItem('token', data.token)
          }
          dispatch(loginResponse(status, data.user, data.token))
        })
      }
    })

  }
}

export function loginFromStorage() {
  return function(dispatch) {
    if(typeof(Storage) !== 'undefined') {
      if(window.sessionStorage.user && window.sessionStorage.token) {
        dispatch(loginResponse(200, window.sessionStorage.getItem('user'), window.sessionStorage.getItem('token')))
      }
    }
  }
}

export function logout() {
  return function(dispatch) {
    if(typeof(Storage) !== 'undefined') {
      if(window.sessionStorage.user) {
        window.sessionStorage.removeItem('user')
      }
      if(window.sessionStorage.token) {
        window.sessionStorage.removeItem('token')
      }
    }
    dispatch(loginResponse(-1, '', ''))
  }
}

import { normalizeTournaments } from '../normalizer.js'

export const ADD_TOURNAMENT = 'ADD_TOURNAMENT'

export const FETCH_TOURNAMENTS = 'FETCH_TOURNAMENTS'
export const STATUS_REQUEST = 0

function requestTournaments() {
  return {
    type: FETCH_TOURNAMENTS,
    status: STATUS_REQUEST
  }
}

function receiveTournaments(status, normalized) {
  return {
    type: FETCH_TOURNAMENTS,
    status,
    normalized
  }
}

function addTournament(tournament) {
  return {
    type: ADD_TOURNAMENT,
    tournament
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

export function fetchTournaments() {
  return function(dispatch) {
    dispatch(requestTournaments())
    return fetch('http://localhost:3000/api/auth/tournaments').then(response => resolve(response, (status, data) => {
        if(status === 200) {
          data.forEach((tournament) => {
            tournament.id = tournament._id
            delete tournament._id
          })
          dispatch(receiveTournaments(status, normalizeTournaments({tournamentList: data})))
        }
      }))
  }
}

export function addTournamentToTournaments(tournament, cb) {
  return function(dispatch, getState) {
    return fetch('http://localhost:3000/api/auth/tournament', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().authorization.token
      },
      body: JSON.stringify({ tournament })
    }).then(response => resolve(response, (status, data) => {
        cb(status)
        console.log(data)
        if(status === 200) {
          dispatch(addTournament({
            name: tournament.name,
            date: tournament.date,
            img: {
              thumbnail: tournament.thumbnail,
              banner: tournament.banner,
            },
            id: data.tournamentId,
            teams: [],
            status: 'scheduled' }))
        }
      }))
  }
}

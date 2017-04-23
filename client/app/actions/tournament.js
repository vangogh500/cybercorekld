import { normalizeTournaments, normalizeUsers, normalizeTeams, normalizeTournamentMatches } from '../normalizer.js'

export const ADD_TOURNAMENT = 'ADD_TOURNAMENT'
export const ADD_TEAM = 'ADD_TEAM'

export const FETCH_TOURNAMENTS = 'FETCH_TOURNAMENTS'
export const FETCH_USERS = 'FETCH_USERS'
export const FETCH_TEAMS = 'FETCH_TEAMS'
export const STATUS_REQUEST = 0

export const TOGGLE_TOURNAMENT_STATUS = 'TOGGLE_TOURNAMENT_STATUS'
export const INITIALIZE_TOURNAMENT = 'INITIALIZE_TOURNAMENT'

function requestTournaments() {
  return {
    type: FETCH_TOURNAMENTS,
    status: STATUS_REQUEST
  }
}

function requestUsers() {
  return {
    type: FETCH_USERS,
    status: STATUS_REQUEST
  }
}

function requestTeams() {
  return {
    type: FETCH_TEAMS,
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

function receiveUsers(status, users) {
  return {
    type: FETCH_USERS,
    status,
    users
  }
}

function receiveTeams(status, teams) {
  return {
    type: FETCH_TEAMS,
    status,
    teams
  }
}

function addTournament(tournament) {
  return {
    type: ADD_TOURNAMENT,
    tournament
  }
}

function addTeam(tournamentId, team) {
  return {
    type: ADD_TEAM,
    tournamentId,
    team
  }
}

function toggleTournamentStatus(tournamentId, status) {
  return {
    type: TOGGLE_TOURNAMENT_STATUS,
    tournamentId,
    status
  }
}

function initializeTournament(tournamentId, normalized) {
  return {
    type: INITIALIZE_TOURNAMENT,
    tournamentId,
    normalized
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
            tournament.matches.forEach((match) => {
              match.id = match._id
              delete match._id
            })
          })
          console.log(data)
          dispatch(receiveTournaments(status, normalizeTournaments({tournamentList: data})))
        }
      }))
  }
}

export function fetchUsers() {
  return function(dispatch, getState) {
    dispatch(requestUsers())
    return fetch('http://localhost:3000/api/auth/users', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + getState().authorization.token
      }
    }).then(response => resolve(response, (status, data) => {
        if(status === 200) {
          data.forEach((user) => {
            user.id = user._id
            delete user._id
          })
          dispatch(receiveUsers(status,normalizeUsers({ users: data }).entities.users))
        }
      }))
  }
}

export function fetchTeams() {
  return function(dispatch) {
    return fetch('http://localhost:3000/api/auth/teams').then(response => resolve(response, (status, data) => {
        if(status === 200) {
          data.forEach((team) => {
            team.id = team._id
            delete team._id
          })
          dispatch(receiveTeams(status, normalizeTeams({ teams: data}).entities.teams))
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
        if(status === 200) {
          dispatch(addTournament({
            name: tournament.name,
            date: tournament.date,
            img: {
              thumbnail: tournament.thumbnail,
              banner: tournament.banner,
            },
            links: {
              fcbk: tournament.fcbk,
              stream: tournament.stream
            },
            id: data.tournamentId,
            teams: [],
            status: 'scheduled' }))
        }
      }))
  }
}

export function addTeamToTournament(team, cb) {
  return function(dispatch, getState) {
    return fetch('http://localhost:3000/api/auth/team', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().authorization.token
      },
      body: JSON.stringify(team)
    }).then(response => resolve(response, (status, data) => {
      cb(status)
      if(status === 200) {
        dispatch(addTeam(team.tournamentId, {
          id: data.teamId,
          name: team.name,
          roster: {
            top: {
              _user: team.roster.top
            },
            jg: {
              _user: team.roster.jg
            },
            mid: {
              _user: team.roster.mid
            },
            adc: {
              _user: team.roster.adc
            },
            supp: {
              _user: team.roster.supp
            },
            sub_1: {
              _user: team.roster.sub_1
            },
            sub_2: {
              _user: team.roster.sub_2
            }
          },
          trophies: [],
          creation: Date.now()
        }))
      }
    }))
  }
}

export function toggleTournamentStatusSync(tournamentId, status, cb) {
  return function(dispatch, getState) {
    return fetch('http://localhost:3000/api/auth/tournament/' + tournamentId +'/' +  status.replace(" ", "_"), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().authorization.token
      }
    }).then(response => resolve(response, (reqStatus, data) => {
      cb(reqStatus)
      dispatch(toggleTournamentStatus(tournamentId, status))
      if(data.length != 0) {
        data.forEach((match) => {
          match.id = match._id
          delete match._id
        })
        dispatch(initializeTournament(tournamentId, normalizeTournamentMatches({ matches: data })))
      }
    }))
  }
}

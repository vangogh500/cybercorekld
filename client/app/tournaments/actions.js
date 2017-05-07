import { normalizeUsers, normalizeTeams, normalizeTournamentMatches } from '../normalizer.js'

import {STATUS_REQUEST} from '../res/numbers.js'
import { resolve } from '../res/util.js'
import { normalizeTournaments } from '../res/normalizer.js'

/**
 * Action type for fetching tournaments
 * @typedef {String} FETCH_TOURNAMENT
 */
export const FETCH_TOURNAMENTS = 'FETCH_TOURNAMENTS'
/**
 * Action type for fetching teams
 * @typedef {String} FETCH_TEAMS
 */
 export const FETCH_TEAMS = 'FETCH_TEAMS'

/**
 * Action type for adding tournament
 * @typedef {String} ADD_TOURNAMENT
 */
export const ADD_TOURNAMENT = 'ADD_TOURNAMENT'
/**
 * Action type for adding team
 * @typedef {String} ADD_TEAM
 */
export const ADD_TEAM = 'ADD_TEAM'

/*
export const TOGGLE_TOURNAMENT_STATUS = 'TOGGLE_TOURNAMENT_STATUS'
export const INITIALIZE_TOURNAMENT = 'INITIALIZE_TOURNAMENT'
*/


function requestTournaments() {
  return {
    type: FETCH_TOURNAMENTS,
    status: STATUS_REQUEST
  }
}

function requestTeams() {
  return {
    type: FETCH_TEAMS,
    status: STATUS_REQUEST
  }
}

function receiveTournaments(status, tournaments, tournamentList) {
  return {
    type: FETCH_TOURNAMENTS,
    status,
    tournaments,
    tournamentList
  }
}

function receiveTeams(status, teams) {
  return {
    type: FETCH_TEAMS,
    status,
    teams
  }
}

function addTournamentResponse(status, tournament) {
  return {
    type: ADD_TOURNAMENT,
    status,
    tournament
  }
}

function addTeamResponse(status, team) {
  return {
    type: ADD_TEAM,
    status,
    team
  }
}
/*
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
*/

export function fetchTournaments() {
  return function(dispatch) {
    dispatch(requestTournaments())
    return fetch('http://localhost:3000/api/auth/tournaments').then(response => resolve(response, (status, data) => {
      const normalized = data ? normalizeTournaments(data) : null
      dispatch(receiveTournaments(status, normalized ? normalized.entities.tournaments : null, normalized ? normalized.result.tournaments : null))
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

export function addTournamentToServer(formContent, cb) {
  return function(dispatch, getState) {
    console.log("server call")
    dispatch(requestTournaments())
    return fetch('http://localhost:3000/api/auth/tournament', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().auth.token
      },
      body: JSON.stringify(formContent)
    }).then(response => resolve(response, (status, data) => {
        cb(status)
        if(data) {
          const newTournament = {
            name: formContent.name,
            date: formContent.date,
            game: formContent.game,
            type: formContent.type,
            players: (formContent.type == "1v1") ? [] : undefined,
            teams: (formContent.type == "teams") ? [] : undefined,
            winningPlayers: (formContent.type == "1v1") ? [] : undefined,
            winningTeams: (formContent.type == "teams") ? [] : undefined,
            status: formContent.status || 'scheduled',
            matches: [],
            links: {
              fcbk: formContent.fcbk,
              stream: formContent.stream,
              gallery: formContent.gallery
            },
            imgs: {
              banner: formContent.banner || 'https://i.ytimg.com/vi/DLiNHCmJzV4/maxresdefault.jpg'
            },
            id: data.id
          }
          console.log(newTournament)
          dispatch(addTournamentResponse(status, newTournament))
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

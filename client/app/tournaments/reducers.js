import { ADD_TOURNAMENT, FETCH_TOURNAMENTS, ADD_TEAM, FETCH_TEAMS, TOGGLE_TOURNAMENT_STATUS, INITIALIZE_TOURNAMENT } from '../actions/tournament.js'

import {STATUS_REQUEST, STATUS_PREREQUEST, STATUS_SUCCESS} from '../res/numbers.js'

function status(state = -1, action) {
  switch(action.type) {
    case FETCH_TOURNAMENTS:
      console.log(action.status)
      return action.status
    case FETCH_TEAMS:
      return action.status
    case ADD_TOURNAMENT:
      return action.status
    case ADD_TEAM:
      return action.status
    default:
      return state
  }
}

function tournaments(state = {}, action) {
  switch(action.type) {
    case FETCH_TOURNAMENTS:
      return (action.status == STATUS_SUCCESS) ? action.tournaments : state
    case ADD_TOURNAMENT:
      console.log(state)
      return {
        [action.tournament.id]: action.tournament,
        ...state
      }
    default:
      return state
  }
}

//TODO: added in a sorted way
function tournamentList(state = [], action) {
  switch(action.type) {
    case FETCH_TOURNAMENTS:
      return (action.status == STATUS_SUCCESS) ? action.tournamentList : state
    case ADD_TOURNAMENT:
      console.log(state)
      return [ ...state, action.tournament.id]
    default:
      return state
  }
 }

function teamList(state = [], action) {
  switch(action.type) {
    case FETCH_TEAMS:
      if(action.status === 200)
        return Object.keys(action.teams).sort((a,b) => {
          return action.teams[b].trophies.length - action.teams[a].trophies.length
        })
      else
        return state
    case ADD_TEAM:
      return [ ...state, action.team.id ]
    default:
      return state
  }
}

function teams(state = {}, action) {
  switch(action.type) {
    case FETCH_TEAMS:
      if(action.status === 200) return action.teams
      else return state
    case ADD_TEAM:
      return {
        ...state,
        [action.team.id]: action.team
      }
    default:
      return state
  }
}

function matches(state = {}, action) {
  switch(action.type) {
    case FETCH_TOURNAMENTS:
      if(action.status === 200) {
        return action.normalized.entities.tournamentMatches
      }
      else {
        return state
      }
    case INITIALIZE_TOURNAMENT:
      return {
        ...state,
        ...action.normalized.entities.tournamentMatches
      }
    default:
      return state
  }
}

function users(state = {
  status: -1,
  users: {}
}, action) {
  switch(action.type) {
    case FETCH_USERS:
      if(action.status === 200) {
        return {
          users: action.users,
          status: action.status
        }
      }
      else return {
        ...state,
        status: action.status
      }
    default:
      return state
  }
}

/**
 * Reducer for authorization
 * @param {Object} state Current state
 * @param {Object} action Action
 * @return {Object} New state
 * @property {Number} status=-1 Status of the login
 * @property {String} tournaments=[] Tournaments
 */
export function tournamentsApp(state = {}, action) {
  return {
    status: status(state.status, action),
    tournaments: tournaments(state.tournaments, action),
    tournamentList: tournamentList(state.tournamentList, action)
  }
}

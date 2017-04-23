import { ADD_TOURNAMENT, FETCH_TOURNAMENTS, STATUS_REQUEST, FETCH_USERS, ADD_TEAM, FETCH_TEAMS, TOGGLE_TOURNAMENT_STATUS, INITIALIZE_TOURNAMENT } from '../actions/tournament.js'

function status(state = -1, action) {
  switch(action.type) {
    case FETCH_USERS:
      return action.status
    default:
      return state
  }
}

function tournamentList(state = [], action, tournamentApp) {
  switch(action.type) {
    case FETCH_TOURNAMENTS:
      if(action.status === 200) {
        return action.normalized.result.tournamentList
      }
      else return state
    case ADD_TOURNAMENT:
      return [ ...state, action.tournament.id].sort((a,b) => {
        if(a == action.tournament.id) a = new Date(action.tournament.date)
        else a = new Date(tournamentApp.tournaments[a].date)
        if(b == action.tournament.id) b = new Date(action.tournament.date)
        else b = new Date(tournamentApp.tournaments[b].date)
        return (a > b) ? -1 : (a < b) ? 1 : 0
      })
    default:
      return state
  }
}

function tournaments(state = {}, action) {
  switch(action.type) {
    case FETCH_TOURNAMENTS:
      if(action.status === 200) {
        return action.normalized.entities.tournaments
      }
      else return state
    case ADD_TOURNAMENT:
      return {
        ...state,
        [action.tournament.id]: action.tournament
      }
    case ADD_TEAM:
      return {
        ...state,
        [action.tournamentId]: {
          ...state[action.tournamentId],
          teams: [ ...state[action.tournamentId].teams, action.team.id]
        }
      }
    case TOGGLE_TOURNAMENT_STATUS:
      return {
        ...state,
        [action.tournamentId]: {
          ...state[action.tournamentId],
          status: action.status
        }
      }
    case INITIALIZE_TOURNAMENT:
      return {
        ...state,
        [action.tournamentId]: {
          ...state[action.tournamentId],
          matches: action.normalized.result.matches
        }
      }
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

export function tournamentApp(state = {}, action) {
  return {
    status: status(state.status, action),
    tournamentList: tournamentList(state.tournamentList, action, state),
    tournaments: tournaments(state.tournaments, action),
    teamList: teamList(state.teamList, action),
    teams: teams(state.teams, action),
    users: users(state.users, action),
    matches: matches(state.matches, action)
  }
}

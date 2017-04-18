import { ADD_TOURNAMENT, FETCH_TOURNAMENTS, STATUS_REQUEST, FETCH_USERS } from '../actions/tournament.js'

function status(state = -1, action) {
  switch(action.type) {
    case FETCH_TOURNAMENTS:
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
    users: users(state.users, action)
  }
}

import { combineReducers } from 'redux'
import { authReducer } from '../authorization/reducers.js'
import { ladderApp } from './ladder.js'
import { tournamentApp } from './tournament.js'
import { usersApp } from '../users/reducers.js'

let app = combineReducers({
  auth: authReducer,
  ladder: ladderApp,
  tournament: tournamentApp,
  users: usersApp
})

export default app

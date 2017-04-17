import { combineReducers } from 'redux'
import { authorization } from './authorization.js'
import { ladderApp } from './ladder.js'
import { tournamentApp } from './tournament.js'

let app = combineReducers({
  authorization,
  ladder: ladderApp,
  tournament: tournamentApp
})

export default app

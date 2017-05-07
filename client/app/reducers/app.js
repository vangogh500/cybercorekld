import { combineReducers } from 'redux'
import { authReducer } from '../authorization/reducers.js'
import { ladderApp } from './ladder.js'
import { tournamentsApp } from '../tournaments/reducers.js'
import { usersApp } from '../users/reducers.js'

let app = combineReducers({
  auth: authReducer,
  ladder: ladderApp,
  tournaments: tournamentsApp,
  users: usersApp
})

export default app

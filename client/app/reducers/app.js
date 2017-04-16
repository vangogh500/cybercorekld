import { combineReducers } from 'redux'
import { authorization } from './authorization.js'
import { ladderApp } from './ladder.js'

let app = combineReducers({
  authorization,
  ladder: ladderApp
})

export default app

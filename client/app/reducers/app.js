import { combineReducers } from 'redux'
import { authorization } from './authorization.js'
import { ladder } from './ladder.js'

let app = combineReducers({
  authorization,
  ladder
})

export default app

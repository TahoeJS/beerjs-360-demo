import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import app from './appReducer'

export default combineReducers({
  app,
  routing: routerReducer
})

import { combineReducers } from 'redux'
import global from './global'
import event from './event'
import workshop from './workshop'
import order from './order'

export default combineReducers({
  global,
  event,
  workshop,
  order,
})

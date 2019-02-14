import { combineReducers } from 'redux'
import global from './global'
import event from './event'
import workshop from './workshop'
import printer from './printer'
import order from './order'

export default combineReducers({
  global,
  event,
  workshop,
  printer,
  order,
})

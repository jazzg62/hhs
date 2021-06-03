import { combineReducers } from 'redux'
import store from './store'
import user from './user'
import discount from './discount'
import pay from './pay'

export default combineReducers({
  user,
  store,
  discount,
  pay
})

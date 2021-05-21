import { combineReducers } from 'redux'
import store from './store'
import user from './user'
import discount from './discount'
import pay from './pay'

export default combineReducers({
  user:user,
  store,
  discount,
  pay
})

// export default function(state, action={type:''}){
//   return {
//     user:user(state, action),
//     store:store(state, action),
//     discount:discount(state, action),
//     pay:pay(state, action)
//   }
// }

import {generateUnionID} from '../utils'
import {Payment} from '../constant'

const INITIAL_STATE = {
  store_id: 0,
  storeb_id: 0,
  member_id: 0,
  money: '',
  discounted_money: 0,
  xflx: process.env.TARO_ENV?Payment.SM_WXPAY:Payment.SM_ALIPAY,
  ddh: generateUnionID(),
  password: '      ',
  use_red_envelop: 1,
  xfq_list: "",
  is_cz: 0,
  xjq_me: 0,
  xjq_id: 0,
  dtgd_zk: 100,
};

export default function store(state = INITIAL_STATE, action){
  switch(action.type){
    case 'SETMONEY':
      return {...state, ...action.payload}
    case 'SETPASSWORD':
      return {...state, ...action.payload}
    case 'SETPREDEPPOSIT':
      return {...state, ...action.payload}
    case 'PAY':
      return {...state, ...action.payload}
    default:
      return state
  }
}

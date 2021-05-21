import {generateUnionID} from '../utils'
import {Payment} from '../constant'

const INITIAL_STATE = {
  store_id: 0,
  storeb_id: 0,
  member_id: 0,
  money: 0,
  discounted_money: 0,
  xflx: Payment.SM_WXPAY,
  ddh: generateUnionID(),
  password: '',
  xfq_list: "",
  use_red_envelop: 1,
  is_cz: 0,
  xjq_me: 0,
  xjq_id: 0,
  dtgd_zk: 100,
};

export default function store(state = INITIAL_STATE, action){
  switch(action.type){
    case 'ajax':
      return {}    // 待编写
    case 'SETMONEY':
      let {money} = action;
      return {...state, money}
    default:
      return state
  }
}

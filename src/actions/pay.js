import { Payment, RESET_INFO } from '../constant';
import {generateUnionID, isTrue} from '../utils/index';

/**
 * 设置支付金额
 * @param {*} money
 * @returns
 */
export function setMoney(money){
  return {
    type:'SETMONEY',
    payload:{
      'money':money
    }
  }
}

/**
 * 设置用户支付密码
 * @param {string} password
 * @returns
 */
export function setPassword(password){
  if(password.length>6)
    return {
      type:'SETPASSWORD',
      payload:{}
    } ;

  return {
    type:'SETPASSWORD',
    payload:{
      'password':password
    }
  }
}

/**
 * 设置使用红包支付
 * @example
 *  this.props.actions.setUsePredeposit(1); // 使用红包支付
 *  this.props.actions.setUsePredeposit(0); // 不使用红包支付
 * @returns
 */
export function setUsePredeposit(val){
  return {
    type:'SETPREDEPPOSIT',
    payload:{
      use_red_envelop:val?1:0
    }
  }
}

/**
 * 设置支付信息
 * @example this.props.actions.Pay();
 */
export function pay(){
  return function(dispatch, getState){
    let state = getState();
    let payload = {
      member_id:state.user.member_id,
      ddh:generateUnionID(),
      store_id:state.store.store_id,
      dtgd_zk:state.discount.dtgd_zk
    };
    dispatch({
      type:'PAY',
      payload
    })
  }
}

/**
 * 更改消费类型
 * @param {string} xflx
 * @returns
 */
export function changeXFLX(xflx){
  let payload ={
    xflx
  }
  return {
    type:'CHANGEXFLX',
    payload
  }
}

/**
 * 是否使用红包
 * @returns
 */
export function changeRedEnvelop(val){
  return {
    type:'CHANGEREDENVELOP',
    payload:{
      use_red_envelop:val
    }
  }
}

/**
 * 是否使用消费券
 * @param {*} val
 * @returns
 */
export function changeXFQ(val){
  return {
    type:'CHANGEXFQ',
    payload:{
      use_xfq:val
    }
  }
}

/**
 * 设置为充值支付
 */
export function setCZ(is_cz){
  let payload = {
    is_cz:is_cz
  };
  // 使用在线充值时，只能用线上支付
  if(isTrue(is_cz)){
    payload.xflx = Payment.SM_XS;
    payload.use_red_envelop = 1;
  }
  return {
    type:'SETCZ',
    payload
  }
}

/**
 * 重置支付
 * @returns
 */
export function resetPay(){
  return RESET_INFO;
}

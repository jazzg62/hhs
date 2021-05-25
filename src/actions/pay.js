import {generateUnionID} from '../utils/index';
/**
 * 设置支付金额
 * @param {*} money
 * @returns
 */
export function setMoney(money){
  return {
    type:'SETMONEY',
    payload:{
      'money':Number(money)
    }
  }
}

/**
 * 设置用户支付密码
 * @param {string} password
 * @returns
 */
export function setPassword(password){
  let _ = password.split('');
  _.length = 6;
  for(let i=0;i<6;i++){
    if(!_[i]){
      _[i] = ' ';
    }
  }

  return {
    type:'SETPASSWORD',
    payload:{
      'password':_.join('')
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

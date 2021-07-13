import {request} from '@tarojs/taro';

/**
 * 使用手机号来获取用户信息
 * @example this.props.actions.getUserInfo('18955756386');
 * @param {*} phone
 * @returns
 */
export function getUserInfo(phone){
  return async function (dispatch) {
		let res = await request({
      url: 'https://pay.cnqilian.com/index.php?act=index&op=getuser',
      method:'GET',
      data: {
        phone:phone
      }
    })
    let payload = {
      member_id:res.data.member_id,
      phone:phone
    }
    dispatch({
      type:'USER',
      payload
    })
	}
}

/**
 * 设置用户手机号
 * @param {*} phone
 * @returns
 */
export function setUserPhone(phone){
  if(phone == 'empty') phone = '';
  let payload = {
    'phone':phone
  };
  return {
    type:'SETPHONE',
    payload
  }
}

/**
 * 设置用户member_id
 * @param {*} member_id
 * @returns
 */
export function setUserMemberID(member_id){
  let payload = {
    'member_id':member_id
  }
  return {
    type:'SETMEMBERID',
    payload
  }
}

/**
 * 设置用户登录code
 * @param {String} login_code
 * @returns
 */
export function setLoginCode(login_code){
  let payload = {
    'login_code':login_code
  }
  return {
    type:'SETLOGINCODE',
    payload
  }
}

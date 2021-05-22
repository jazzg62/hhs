import Taro from '@tarojs/taro';

// 根据手机号来获取用户信息
export function getUserInfo(phone){
  return  async function (dispatch, getState) {
		// 返回的函数体内自由实现。。。
		let res = await Taro.request({
      url: 'https://pay.cnqilian.com/?act=index&op=getuser', //仅为示例，并非真实的接口地址
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
      type:'USER_INFO',
      payload
    })
	}
}

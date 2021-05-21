// 获取用户信息
export function getUserInfo(phone){
  return {
    type:'GETUSERINFO',
    phone
  }
}

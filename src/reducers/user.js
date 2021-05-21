import Taro from '@tarojs/taro'

const INITIAL_STATE = {
  member_id:0,
  phone:0
}

export default  function store(state = INITIAL_STATE, action){
  switch(action.type){
    case 'ajax':
      return {
        ...state,
      }
    case 'GETUSERINFO':
      Taro.request({
        url: 'https://pay.cnqilian.com/?act=index&op=getuser', //仅为示例，并非真实的接口地址
        method:'GET',
        data: {
          store_id:5418,
          phone:action.phone
        }
      })
      .then((res)=>{
        console.log(res);
        // 调用更新用户信息的reducer
        store(state, {type:'GETUSERINFO_', res})
      })
      return state
    case 'GETUSERINFO_':
      let {member_id} = action.res.data;
      return {...state, member_id}
    default:
      console.log('user state',state);
      return state
  }
}

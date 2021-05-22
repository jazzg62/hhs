import {request} from '@tarojs/taro';

export function getStoreInfo(store_id){
  return async function(dispatch, getState){
    let res = await request({
      url: 'https://pay.cnqilian.com/?act=index&op=store', //仅为示例，并非真实的接口地址
      method:'GET',
      data: {
        store_id:store_id,
      }
    })
    let store_info = res.data;
    dispatch({
      type:'STORE_INFO',
      payload:{
        store_id:store_info['store_id'],
        store_name:store_info['store_name'],
        store_avatar:store_info['store_avatar'],
      }
    })
  }
}

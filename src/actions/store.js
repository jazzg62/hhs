import {request} from '@tarojs/taro';

/**
 * 使用store_id获取商家信息
 * @example this.props.actions.getStoreInfo(5418);
 * @param {*} store_id
 * @returns
 */
export function getStoreInfo(store_id, storeb_id){
  return async function(dispatch, getState){
    let res = await request({
      url: 'https://pay.cnqilian.com/index.php?act=index&op=store', //仅为示例，并非真实的接口地址
      method:'GET',
      data: {
        store_id:store_id,
        storeb_id:storeb_id
      }
    })
    let store_info = res.data;
    dispatch({
      type:'STORE',
      payload:{
        store_id:store_id,
        storeb_id:storeb_id,
        store_name:store_info['store_name'],
        store_avatar:store_info['store_avatar'],
        fdmc:store_info['fdmc']
      }
    })
  }
}

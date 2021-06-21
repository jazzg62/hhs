import {request} from '@tarojs/taro';

/**
 * 使用store_id获取商家信息
 * @example this.props.actions.getStoreInfo(5418);
 * @param {*} store_id
 * @returns
 */
export function getStoreInfo(store_id, storeb_id){
  return async function(dispatch, getState){
    let state = getState();
    let store_state = state.store;
    // 重复扫码时，不获取数据
    if(store_state.store_id == store_id && store_state.storeb_id == storeb_id){
      return ;
    }
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

export function chongZhiYouHui(store_id, storeb_id){
  return async function(dispatch){
    let res = await request({
      url: 'https://pay.cnqilian.com/index.php?act=index&op=czgz',
      method: 'GET',
      data: {
        store_id: store_id,
        storeb_id: storeb_id
      }
    })
    let payload = {
      czyh:[]
    };
    if(res.data.res != 0 ){
      payload.czyh = res.data.list;
    }
    return dispatch({
      type:'CHONGZHIYOUHUI',
      payload
    })
  }
}

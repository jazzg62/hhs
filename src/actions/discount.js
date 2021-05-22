import {request} from '@tarojs/taro';

export function getDiscount(money){
  return async function(dispatch, getState){
    let state = getState();
    let res = await request({
      url: 'https://pay.cnqilian.com/?act=index&op=yhxx',
      method:'GET',
      data: {
        member_id:state.user.member_id,
        xfje:money,
        store_id:state.store.store_id
      }
    })

    let payload = {
      dtgd_zk:Number(res.data.dtgd_info['zk']),
      xjq:res.data.xjq,
      xjq_id:res.data.xjq_info,
      predeposit:Number(res.data.member_info.available_predeposit),
    }
    return dispatch({
      type:'DISCOUNT',
      payload
    })
  }
}

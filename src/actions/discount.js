import {request} from '@tarojs/taro';
import {redirect_discount} from '../utils/index';

/**
 * 获取优惠信息，需要先获取member_id和store_id
 * @param {*} money
 * @returns
 */
export function getDiscount(money){
  return async function(dispatch, getState){
    let state = getState();
    let res = await request({
      url: 'https://pay.cnql888.com/index.php?act=index&op=yhxx',
      method:'GET',
      data: {
        member_id:state.user.member_id,
        xfje:money,
        store_id:state.store.store_id,
        storeb_id:state.store.storeb_id
      }
    })

    let payload = {
      dtgd_zk:Number(res.data.dtgd_info['zk'] || 100),
      xjq:res.data.xjq || 0,
      xjq_id:res.data.xjq_info['id'] || 0,
      xjq_me:res.data.xjq_info['me'] || 0,
      predeposit:Number(res.data.member_info.available_predeposit),
      czye:res.data.czye,
      xjq_bl:res.data.xjq_info['xjqbl'] || 0
    }

    redirect_discount();
    return dispatch({
      type:'DISCOUNT',
      payload
    })
  }
}

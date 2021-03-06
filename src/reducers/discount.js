const INITIAL_STATE = {
  dtgd_zk:100,   // 动态股东折扣
  xjq_id:0,      // 消费券规则id
  xjq_me:0,      // 消费券面额
  xjq:0,         // 用户消费券余额
  xjq_bl:0,      // 消费券比例优惠
  predeposit:0,   // 红包余额
  czye:0,          // 充值余额
  is_hyk:0,        // 是否是商家的会员卡用户
  hyk_text:'您是本店会员，红包仅异店消费可用',
  xfq:0,          // 优惠券
  aff:0           // 阿福分优惠比例
}

export default function store(state = INITIAL_STATE, action){
  switch(action.type){
    case 'DISCOUNT':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

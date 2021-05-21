const INITIAL_STATE = {
  store_id:0,
  store_name:'商家名',
  store_avatar:'https://new.cnqilian.com/wap/images/qlpt1.png'
}

export default function store(state = INITIAL_STATE, action){
  switch(action.type){
    case 'ajax':
      const { store_id, store_name, store_avatar } = action.ajax;
      return {
        ...state,
        store_id,
        store_name,
        store_avatar
      }
    case 'GETSTOREINFO':
      const {storeInfo} = action.payload
      return {
        ...state,
        storeInfo
      }
    default:
      return state
  }
}

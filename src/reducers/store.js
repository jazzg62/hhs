const INITIAL_STATE = {
  store_id:process.env.TARO_ENV?5418:0,
  store_name:'加载商家名中...',
  store_avatar:'https://new.cnqilian.com/wap/images/qlpt1.png'
}

export default function store(state = INITIAL_STATE, action){
  switch(action.type){
    case 'STORE':
      return {
       ...state,
       ...action.payload
      }
    default:
      return state
  }
}

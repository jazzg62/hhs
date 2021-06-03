const INITIAL_STATE = {
  store_id:0,
  storeb_id:0,
  store_name:'商家名有七个字',
  store_avatar:'https://new.cnqilian.com/wap/images/qlpt1.png',
  fdmc:''
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

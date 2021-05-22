const INITIAL_STATE = {
  dtgd_zk:100,
  xjq:0,
  xjq_id:0,
  predeposit:0
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

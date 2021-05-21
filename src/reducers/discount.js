const INITIAL_STATE = {
  dtgd_zk:100,
  xjq:0,
  xjq_id:0,
  xjq_list:[]
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
    default:
      return state
  }
}

const INITIAL_STATE = {
  member_id:0,
  phone:0,
  predeposit:0
}

export default  function store(state = INITIAL_STATE, action){
  switch(action.type){
    case 'USER':
      return {...state,...action.payload}
    default:
      return state
  }
}

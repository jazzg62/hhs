const INITIAL_STATE = {
  member_id:'',
  phone:'',
  login_code:''
}

export default  function store(state = INITIAL_STATE, action){
  switch(action.type){
    case 'USER':
      return {...state, ...action.payload}
    case 'SETPHONE':
      return {...state, ...action.payload}
    case 'SETMEMBERID':
      return {...state, ...action.payload}
    case 'SETLOGINCODE':
      return {...state, ...action.payload}
    default:
      return state
  }
}

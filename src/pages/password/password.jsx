import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './password.scss'

import {getUserInfo} from '../../actions/user'
import {setMoney} from '../../actions/pay';
import { connect } from 'react-redux';

const stateToIndex = function(state){
  console.log(state);
  return {
    store:state.store,
    user:state.user,
    pay:state.pay,
    discount:state.discount
  }
}

const dispatchToProps = function(dispatch){
  return {
    getUserInfo:(phone)=>dispatch(getUserInfo(phone)),
    setMoney:(money)=>dispatch(setMoney(money))
  }
}

@connect(
  stateToIndex,
  dispatchToProps
)
export default class Index extends Component {
  constructor(props){
    super(props);
    console.log(props)
  }

  componentWillMount () {
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let {money} = this.props.pay;

    return (
      <View>
        <Text>要支付的金额{money}</Text>
        <Text>请输入您的企联支付密码</Text>
      </View>
    )
  }
}

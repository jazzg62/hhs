import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './discount.scss'

import {getUserInfo} from '../../actions/user'
import {setMoney} from '../../actions/pay';
import { connect } from 'react-redux';

const stateToIndex = function(state){
  console.log(state);
  return {
    store:state.store,
    user:state.user,
    pay:state.pay,
    discount:state.pay
  }
}

// const dispatchToProps = function(dispatch){
//   return {
//     getUserInfo:(phone)=>dispatch(getUserInfo(phone)),
//     setMoney:(money)=>dispatch(setMoney(money))
//   }
// }

@connect(
  stateToIndex,
  // dispatchToProps
)
export default class Index extends Component {
  // constructor(props){
  //   super(props);
  //   console.log(props)
  // }

  componentWillMount () {
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {

    return (
      <View>
        <Text>优惠信息页</Text>
      </View>
    )
  }
}

import { Component } from 'react'
import { View, Text, Image, Button, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './index.scss'
import {getUserInfo} from '../../actions/user'
import {setMoney} from '../../actions/pay';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'

const stateToIndex = function(state){
  console.log(state);
  return {
    store:state.store,
    user:state.user,
    pay:state.pay,
    discount:state.pay
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
    console.log('props',props);
    // 获取用户member_id示例
    // this.props.getUserInfo('18955756387');
    this.handleMoneyChange = this.handleMoneyChange.bind(this);
    this.state ={
      showDrawer:false
    }
  }

  getUserInfo(phone){
    return this.props.actions.getUserInfo(phone)
  }

  handleMoneyChange(event){
    this.props.setMoney(event.detail.value)
  }

  handelPayClick(event){
    let {money} = this.props.pay;
    if(money<0.01){
      Taro.showModal({
        title:'注意',
        content:'支付金额不能少于0.01元'
      })
      return ;
    }
    Taro.navigateTo({
      url:'/pages/discount/discount?id=1'
    })
  }

  componentWillMount () {
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const storeInfo = this.props.store;
    const payInfo = this.props.pay;

    return (
      <View className='index'>
        <View className='index-top__banner'></View>
        <View className='index-store__block' id={storeInfo.store_id}>
          <Image className='index-store__avatar'
            src={storeInfo.store_avatar}
          />
          <Text className='index-store__name'>{storeInfo.store_name}</Text>
        </View>

        <View className='index-line-gray'></View>

        <View className='index-input'>
          <Text>付款金额:</Text>
          <Input  type='number' placeholder='请输入支付金额' focus value={payInfo.money} onBlur={this.handleMoneyChange} />
        </View>

        <Button className='index-pay__button' onClick={this.handelPayClick.bind(this)}>支付</Button>

      </View>
    )
  }
}

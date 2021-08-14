import { Component } from 'react'
import { View, Text, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import './password.scss'

import { setPassword } from '../../actions/pay';
import toPay from '../../utils/pay';

const stateToIndex = function (state) {
  return {
    pay: state.pay,
  }
}

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ setPassword, toPay}, dispatch)
})

@connect(
  stateToIndex,
  dispatchToProps
)
class Index extends Component {
  constructor(props) {
    super(props);
  }

  handleInput(event) {
    this.props.actions.setPassword(event.detail.value);
  }

  handlePayClick(){
    if(this.props.pay.password.trim().length != 6){
      Taro.showModal({
        title:'错误',
        content:'密码为6位数字，请检查后再试！',
        mask:true,
        showCancel:false
      })
      return ;
    }
    this.props.actions.toPay();
  }

  render() {
    let { password } = this.props.pay;

    let inputs = [(
      <Input className='password-input__type3' focus='true' maxlength='6' password type='digit' name='password' id='password' key='a1'
        value={password.trim()}
        onInput={this.handleInput.bind(this)}
      />
    ) ]

    return (
      <View>
        {/* <Text>支付密码{this.state.password}</Text> */}
        <View className='password-input' >
          {inputs}
        </View>
        <View className='password-description'>
          <Text>密码为6位数字</Text>
        </View>
        <View className='password-submit'>
          <Button className='password-submit__button' onClick={this.handlePayClick.bind(this)}>提交</Button>
        </View>
      </View>
    )
  }
}

export default Index

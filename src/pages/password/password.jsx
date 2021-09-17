import { Component } from 'react'
import { View, Text, Input, Button } from '@tarojs/components'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import './password.scss'

import NumberKeyboard from '../../components/NumberKeyboard';
import { setPassword } from '../../actions/pay';
import toPay from '../../utils/pay';
import { isTrue } from '../../utils';

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
    this.state = {
      showNumberKeyboard:false
    }
  }

  showNumberKeyboard(){
    this.setState({
      showNumberKeyboard:true
    })
  }

  hideNumberKeyboard(){
    this.setState({
      showNumberKeyboard:false
    })
  }

  handleKeyboardChange(val) {
    this.props.actions.setPassword(this.props.pay.password+''+val);
  }

  handleKeyboardDel(){
    let _ = (this.props.pay.password+'').split('');
    _.pop();
    this.props.actions.setPassword(_.join(''));
  }

  handleClick() {
    this.setState({
      showNumberKeyboard:true
    })
  }

  handleBlur() {
    this.setState({
      showNumberKeyboard:false
    })
  }

  handlePayClick(){
    this.props.actions.toPay();
  }

  render() {
    let { password } = this.props.pay;
    let _password= password.split('');
    console.log(_password);
    for(var i=0;i<6;i++){
      if(_password[i] == ' ' || _password[i] == undefined){
        _password[i] = '';
      }
    }
    let inputs = _password.map((val,idx) => {
        return <Input key={idx} className='password-input__type1' password type='password' maxlength='1' value={val} disabled></Input>
    })

    return (
      <View>
        <View className='password-input' onClick={this.showNumberKeyboard.bind(this)}>
          {inputs}
        </View>
        <View className='password-description'>
          <Text>密码为6位数字</Text>
        </View>
        <View className='password-submit'>
          <Button className='password-submit__button' onClick={this.handlePayClick.bind(this)}>提交</Button>
        </View>

        <NumberKeyboard show={this.state.showNumberKeyboard} keyList={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]} showSidebar input={this.handleKeyboardChange.bind(this)} delete={this.handleKeyboardDel.bind(this)} done={this.handlePayClick.bind(this)} blur={this.hideNumberKeyboard.bind(this)} />
      </View>
    )
  }
}

export default Index

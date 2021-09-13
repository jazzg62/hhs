import { Component } from 'react'
import { View, Text, Input, Button } from '@tarojs/components'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import './password.scss'

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
      inputIng: false,
      inputEnd: false,
    }
  }

  componentWillMount() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleClick() {
    this.setState({
      inputIng: true,
      inputEnd: false
    })
  }

  handleBlur() {
    this.setState({
      inputIng: false,
      inputEnd: true
    })
  }

  handleInput(event) {
    this.props.actions.setPassword(event.detail.value);
  }

  handlePayClick(){
    // 调起支付
    this.props.actions.toPay();
  }

  render() {
    let { password } = this.props.pay;
    let _password= password.split('');
    for(var i=0;i<6;i++){
      if(!isTrue(_password[i])){
        _password[i] = '';
      }
    }
    let inputs = _password.map((val,idx) => {
        return <Input key={idx} className='password-input__type1' password type='password' maxlength='1' value={isTrue(val)?val:''} disabled></Input>
    })

    if (this.state.inputIng || (!this.state.inputIng && !this.state.inputEnd)) {
      inputs.push(<Input focus='true' className='password-input__type2' type='number' name='password' id='password'
        value={password.trim()}
        onInput={this.handleInput.bind(this)}
        onBlur={this.handleBlur.bind(this)}
      />)
    } else {
      inputs.push(
        <Input className='password-input__type2' type='number' name='password' id='password'
          value={password.trim()}
          onInput={this.handleInput.bind(this)}
          onBlur={this.handleBlur.bind(this)}
        />
      )
    }

    return (
      <View>
        {/* <Text>支付密码{this.state.password}</Text> */}
        <View className='password-input' onClick={this.handleClick.bind(this)}>
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

import { Component } from 'react'
import { View, Text, Input, Button } from '@tarojs/components'
import { connect } from 'react-redux';
import './password.scss'

import { setPassword } from '../../actions/pay';

const stateToIndex = function (state) {
  return {
    pay: state.pay,
  }
}

const dispatchToProps = function (dispatch) {
  return {
    setPassword: (password) => dispatch(setPassword(password))
  }
}

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

  handleClick(event) {
    this.setState({
      inputIng: true,
      inputEnd: false
    })
  }

  handleBlur(event) {
    this.setState({
      inputIng: false,
      inputEnd: true
    })
  }

  handleInput(event) {
    this.props.setPassword(event.detail.value);
  }

  render() {
    let { password } = this.props.pay;
    let inputs = password.split('').map((val, idx) => {
      if (val != ' ')
        return <Input className='password-input__type1' type='password' maxlength='1' value={val} disabled></Input>
      else
        return <Input className='password-input__type1' type='password' maxlength='1' disabled></Input>
    })

    if (this.state.inputIng || (!this.state.inputIng && !this.state.inputEnd)) {
      inputs.push(<Input focus className='password-input__type2' type='number' name='password' id='password'
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
          <Button>提交</Button>
        </View>
      </View>
    )
  }
}

export default Index

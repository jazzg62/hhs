import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import './discount.scss'
import * as discount from '../../actions/discount'

const stateToIndex = function (state) {
  console.log(state);
  return {
    store: state.store,
    user: state.user,
    pay: state.pay,
    discount: state.discount
  }
}

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...discount }, dispatch)
})


@connect(
  stateToIndex,
  dispatchToProps
)
class Index extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  componentWillMount() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    let { money } = this.props.pay;

    return (
      <View>
        <View>
          <Text>要支付的金额{money}</Text>
        </View>
        <View>

        </View>
      </View>
    )
  }
}

export default Index

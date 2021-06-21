import { View } from '@tarojs/components'
import { Component } from 'React';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Tag from '../Tag';
import './index.scss';

const stateToIndex = function (state) {
  return {
    store: state.store,
  }
}

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ }, dispatch)
})

@connect(
  stateToIndex,
  dispatchToProps
)
class Index extends Component {
  render() {
    let list = this.props.store.czyh;
    if (list.length == 0) {
      return <View></View>
    }
    let num = Number;
    return <View className='index-yhxx'>
      <Tag text='充值优惠' type='success'></Tag>
      {
        list.map((val) => {
          return <Tag key={val.id} text={`充${num(+val.limit_je)}得${num(+val.limit_je + +val.aval_je)}`} type='primary'></Tag>
        })
      }
    </View>
  }
}

export default Index

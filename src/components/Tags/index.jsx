import { View } from '@tarojs/components'
import { request } from '@tarojs/taro';
import { Component } from 'React';
import Tag from '../Tag';
import './index.scss';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store_id: props.store_id,
      storeb_id: props.storeb_id,
      list: []
    }
    this.requestChongZhiYouHui();
  }

  async requestChongZhiYouHui() {
    let res = await request({
      url: 'https://pay.cnqilian.com/index.php?act=index&op=czgz',
      method: 'GET',
      data: {
        store_id: this.state.store_id,
        storeb_id: this.state.storeb_id
      }
    })
    this.setState(Object.assign({}, this.state, {
      ...res.data
    }))
  }

  render() {
    if (this.state.list.length == 0) {
      return <View></View>
    }
    let num = Number;
    let {list} = this.state;
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

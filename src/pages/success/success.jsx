import { Component } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro, { getCurrentInstance, request } from '@tarojs/taro';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './success.scss'
import { formatDate, toFixed2, transXFLX } from '../../utils/index';
import success from '../../assets/success.svg'
import Loading from '../../components/Loading/index'
import { Payment } from '../../constant';
import {resetPay} from '../../actions/pay';

const stateToIndex = function (state) {
  return {
    store: state.store,
  }
}

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({resetPay}, dispatch)
})

@connect(
  stateToIndex,
  dispatchToProps
)
class Index extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    let datas = getCurrentInstance().router.params
    let ddh = datas['ddh'];
    this.props.actions.resetPay();

    this.state = {
      store_name: '错误加载',
      storeb_name: '',
      xfze: 0,
      xfje: 0,
      xfdk: 0,
      addtime: '1-1 00:01',
      xflx: '微信支付',
      sn: '000000000000000000',
      isLoading: true,
      xfq:0
    }

    request({
      url: 'https://pay.cnqilian.com/?act=index&op=ddh', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        ddh: ddh,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
    })
      .then(res => {
        res = res.data.data;
        let data = {
          store_name: res.store_name,
          storeb_name: res.storeb_name,
          xfze: toFixed2(res.xfze),
          xfje: toFixed2(res.xfje),
          xfdk: toFixed2(res.xfze - res.xfje),
          addtime: formatDate(new Date(+res.addtime * 1000), 'yyyy-MM-dd hh:mm'),
          xflx: transXFLX(res.xflx),
          xfq:res.xfq1 || (Number(res.xfje)/2),
          sn: res.sn|| '000000000000',
          isLoading: false
        }
        data['xfq'] = toFixed2(data['xfq']);
        if(res.xflx == Payment.SM_CZ){
          data['xfq'] = 0;
        }
        this.setState(data);
      })
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleContinuePay() {
    Taro.reLaunch({
      url: '/pages/scan/scan'
    })
  }

  handleRedirectYFZX() {
    let src;
    if(process.env.TARO_ENV == 'weapp')
      src= 'https://new.cnqilian.com/wap/gyl/my.html';
    else
      src = 'https://new.cnqilian.com/wap/alipay1/my.html';
    Taro.reLaunch({
      url: '/pages/index/index?src='+encodeURIComponent(src)
    })
  }

  render() {
    let { state } = this;

    return (
      <View className='success'  >
        <View className='success-banner'>
          <Text className='success-banner__text1'>支付成功</Text>
          <Text className='success-banner__text2'>感谢您对我们的信任与支持，欢迎下次再来！</Text>
          <Image className='success-banner__image' src={success}></Image>
        </View>

        <View className='success-list'>
          <View className='success-item'>
            <Text className='success-item__key'>交易商家</Text>
            <Text className='success-item__val'>{state.store_name}</Text>
          </View>

          {state.storeb_name != '' ? <View className='success-item'>
            <Text className='success-item__key'>分店名称</Text>
            <Text className='success-item__val'>{state.storeb_name}</Text>
          </View> : ''}


          <View className='success-item'>
            <Text className='success-item__key'>消费金额</Text>
            <Text className='success-item__val'>{state.xfze}</Text>
          </View>
          {state.xfdk != 0 ? <View className='success-item'>
            <Text className='success-item__key'>优惠抵扣</Text>
            <Text className='success-item__val'>{state.xfdk}</Text>
          </View> : ''}
          <View className='success-item'>
            <Text className='success-item__key'>实际支付</Text>
            <Text className='success-item__val'>{state.xfje}</Text>
          </View>
          <View className='success-item'>
            <Text className='success-item__key'>交易时间</Text>
            <Text className='success-item__val'>{state.addtime}</Text>
          </View>
          <View className='success-item'>
            <Text className='success-item__key'>交易方式</Text>
            <Text className='success-item__val'>{state.xflx}</Text>
          </View>
          <View className='success-item'>
            <Text className='success-item__key'>交易编号</Text>
            <Text className='success-item__val'>{state.sn}</Text>
          </View>
          {state.xfq!=0?<View className='success-item'>
            <Text className='success-item__key success-item__key-important'>商圈福利</Text>
            <Text className='success-item__val success-item__val-important'>本次交易获得{state.xfq}元消费券</Text>
          </View>:''}
        </View>

        <View className='success-operate'>
          <Button size='default' className='success-operate__button success-operate__button1' onClick={this.handleContinuePay.bind(this)}>继续支付</Button>
          <Button size='default' className='success-operate__button success-operate__button2' onClick={this.handleRedirectYFZX.bind(this)}>返回缘粉中心</Button>
        </View>

        <Loading isLoading={state.isLoading} />
      </View>
    )
  }
}

export default Index

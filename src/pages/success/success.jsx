import { Component } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro, { getCurrentInstance, request } from '@tarojs/taro';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './success.scss'
import { formatDate, toFixed2, transXFLX, translate_jl } from '../../utils/index';
import success from '../../assets/success.svg'
import Loading from '../../components/Loading/index'
import { Payment } from '../../constant';
import { resetPay } from '../../actions/pay';

const stateToIndex = function (state) {
  return {
    store: state.store,
  }
}

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ resetPay }, dispatch)
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
      show: true,
      member_id:0,
      store_name: '错误加载',
      storeb_name: '',
      xfze: 0,
      xfje: 0,
      xfdk: 0,
      addtime: '1-1 00:01',
      xflx: '微信支付',
      sn: '000000000000000000',
      isLoading: true,
      xfq: 0,
      hasStore: false,
      storeList: [],
      hasReward: false,
      reward: [
      ]
    }

    request({
      url: 'https://pay.cnqilian.com/?act=index&op=ddh',
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
          member_id:res.member_id,
          store_name: res.store_name,
          storeb_name: res.storeb_name,
          xfze: toFixed2(res.xfze),
          xfje: toFixed2(res.xfje),
          xfdk: toFixed2(res.xfze - res.xfje),
          addtime: formatDate(new Date(+res.addtime * 1000), 'yyyy-MM-dd hh:mm'),
          xflx: transXFLX(res.xflx),
          xfq: res.xfq1 || (Number(res.xfje) / 2),
          sn: res.sn || '000000000000',
          storeList: res.sq,
          isLoading: false
        }
        data['xfq'] = toFixed2(data['xfq']);
        data['hasStore'] = res.sq.length>0;
        data['hasReward'] = res.wpq.length>0;
        data['reward'] = res.wpq;
        for(let i in data['reward']){
          data['reward'][i].status = true;
        }
        if (res.xflx == Payment.SM_CZ) {
          data['xfq'] = 0;
        }
        this.setState(data);
      })
  }

  handleContinuePay() {
    Taro.reLaunch({
      url: '/pages/scan/scan'
    })
  }

  handleRedirectYFZX() {
    let src;
    if (process.env.TARO_ENV == 'weapp')
      src = 'https://new.cnqilian.com/wap/gyl/my.html';
    else
      src = 'https://new.cnqilian.com/wap/alipay1/my.html';
    Taro.reLaunch({
      url: '/pages/index/index?src=' + encodeURIComponent(src)
    })
  }

  handleChangeShow() {
    this.setState({
      show: !this.state.show
    })
  }

  handleGetReward(idx, wpq_id) {
    if(this.state.reward[idx].status){
      request({
        url: 'https://pay.cnqilian.com/?act=index&op=wpqlq',
        method: 'POST',
        data: {
          member_id: this.state.member_id,
          wpq_id: wpq_id,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
      })
      .then(res=>{
        if(res.data.res == 1){
          let reward = this.state.reward;
          reward[idx].status = false;
          this.setState({
            reward: reward
          })
        }else{
          let errorMessage = res.data.error || '领取失败';
          Taro.showModal({
            title: '提示',
            content: errorMessage,
            showCancel: false,
          })
        }
      })
    }
  }

  render() {
    let { state } = this;

    return (
      <View className='success'  >
        <View className='success-banner'>
          <Text className='success-banner__text2'>支付成功</Text>
          <Text className='success-banner__text1'><Text className='success-banner__text1-i'>￥</Text>{state.xfze}</Text>
          <Image className='success-banner__image' src={success}></Image>
        </View>

        <View className='success-block'>
          <Text className='success-more' onClick={this.handleChangeShow.bind(this)}>{state.show ? '查看支付详情' : '关闭支付详情'}</Text>
        </View>


        {state.show && !state.hasReward && !state.hasStore?<View className='success-ggw'>
          <Image className='success-ggw__img' src='https://pay.cnqilian.com/image/ggw.jpg'></Image>
        </View>:null}

        {state.show && state.hasReward ? <View className='success-reward'>
          <View className='success-reward-list'>
            {state.reward.map((item, idx) => {
                return (<View className='success-reward-item' key={item.wpmc}>
                <View className='success-reward__avatar'>
                  <Image className='success-reward__avatar-img' src={item.store_avatar}></Image>
                </View>

                <View className='success-reward__content'>
                  <Text className='success-reward__content-title'>{item.store_name}</Text>
                  <Text className='success-reward__content-text'>
                    {item.wpmc}
                  </Text>
                  <Text className='success-reward__content-amount'>× {item.reward_amount || 1}</Text>
                  <Text className={item.status?'success-reward__content-get':'success-reward__content-geted'} onClick={() => this.handleGetReward(idx, item.id)}>{item.status ?'领 取':'已领取'}</Text>
                </View>
              </View>)
            })}
          </View>
        </View> : null}

        {state.show ? <View className={!state.hasReward?'success-store success-store-h':'success-store success-store-l'}>
          {state.hasStore?<View className='store-list' >
            {
              state.storeList.map((item) => {
                return (
                  <View className='store-item' key={item.store_id}>
                    <View className='pic'>
                      <Image className='pic-img' src={item.store_avatar} ></Image>
                    </View>
                    <View className='info'>
                      <View className='name'>{item.store_name}</View>
                      <View className='sale'>
                        <View className='grade'>
                          <Image className='grade-img' src='https://new.cnqilian.com/wap/gyl/images/28.png' alt='' />
                          <Image className='grade-img' src='https://new.cnqilian.com/wap/gyl/images/28.png' alt='' />
                          <Image className='grade-img' src='https://new.cnqilian.com/wap/gyl/images/28.png' alt='' />
                          <Image className='grade-img' src='https://new.cnqilian.com/wap/gyl/images/28.png' alt='' />
                          <Image className='grade-img' src='https://new.cnqilian.com/wap/gyl/images/28.png' alt='' />
                          <Text className='grade-text'>5.0</Text>
                        </View>
                        <View className='number'>
                          <Text className='number-text'>距离：{translate_jl(item.jl)}</Text>
                        </View>
                      </View>

                      {item.xjqkz == 1 && item.yhq != '' && item.yhq.length > 0 ? (
                        <View className='lab'>
                          {item.yhq.map((item1, index1) => {
                            return (
                              <Text className='lab-text' key={index1}>满{Number(item1.limit_1)}减{Number(item1.me)}</Text>
                            )
                          })
                          }
                        </View>
                      ) : null}

                      {item.xjqkz == 2 ? (
                        <View className='lab'>
                          <Text className='lab-text'>消费券可抵扣{Number(item.xjqbl)}%</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                )
              })
            }
          </View>:null}
        </View> : <View className='success-list'>
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
          {state.xfq != 0 ? <View className='success-item'>
            <Text className='success-item__key success-item__key-important'>商圈福利</Text>
            <Text className='success-item__val success-item__val-important'>本次交易获得{state.xfq}元消费券</Text>
          </View> : ''}
        </View>}

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

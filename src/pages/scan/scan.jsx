import { Component } from 'react'
import { View, Text, Image, Button, Input } from '@tarojs/components'
import Taro, { getCurrentInstance, getStorage, setStorage } from '@tarojs/taro'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './scan.scss'

import { getUserInfo } from '../../actions/user'
import * as pay_actions from '../../actions/pay'
import { getDiscount } from '../../actions/discount'
import * as store_actions from '../../actions/store'
import ggw from '../../assets/ggw.jpg'

const stateToIndex = function (state) {
  return {
    store: state.store,
    user: state.user,
    pay: state.pay,
    discount: state.discount
  }
}

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...store_actions, ...pay_actions, getUserInfo, getDiscount }, dispatch)
})

@connect(
  stateToIndex,
  dispatchToProps
)
class Index extends Component {

  constructor(props) {
    super(props);

    // 商家信息
    let datas = getCurrentInstance().router.params
    let store_id = datas['store_id'] || 5413;
    this.props.actions.getStoreInfo(store_id);


    // 用户信息
    if(this.props.user.member_id == 123){
      getStorage({
        key:'phone',
        success:res=>{
          console.log('phone',res.data)
          this.props.actions.getUserInfo(res.data)
        }
      })
    }

    // this.props.actions.getUserInfo('18955756387');
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  getUserInfo(phone) {
    return this.props.actions.getUserInfo(phone)
  }

  handleMoneyChange(event) {
    this.props.actions.setMoney(event.detail.value)
  }

  handlePayClick(event) {
    let { money } = this.props.pay;
    if (money < 0.01) {
      Taro.showModal({
        title: '注意',
        content: '支付金额不能少于0.01元'
      })
      return;
    }
    this.props.actions.getDiscount(money)

    // Taro.navigateTo({
    //   url:'/pages/discount/discount?id=1'
    // })
    Taro.navigateTo({
      url: '/pages/password/password?id=1'
    })
  }

  /**
   * 解密手机号
   * @returns
   */
  getPhoneNumber(e) {
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      Taro.request({
        url: 'https://pay.cnqilian.com/index.php?act=index&op=getPhone1',
        method: 'POST',
        data: {
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      .then((res)=>{
        console.log(res.data);
        let { money } = this.props.pay;

        if (money < 0.01) {
          Taro.showModal({
            title: '注意',
            content: '支付金额不能为0'
          })
          return;
        }
        this.props.actions.getDiscount(money)

        // Taro.navigateTo({
        //   url:'/pages/discount/discount?id=1'
        // })
        Taro.navigateTo({
          url: '/pages/password/password?id=1'
        })

      })
    }else{
      console.log('用户取消了授权');
    }
  }

  render() {
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
          <Text>{storeInfo.store_id}</Text>
        </View>

        <View className='index-line-gray'></View>

        <View className='index-input'>
          <Text>付款金额:</Text>
          <Input type='number' placeholder='请输入支付金额' value={payInfo.money} onInput={this.handleMoneyChange.bind(this)} />
        </View>

        <Button openType='getPhoneNumber'
          onGetphonenumber={this.getPhoneNumber.bind(this)} className='index-pay__button'
          // onClick={this.handlePayClick.bind(this)}
        >提交</Button>

        <View className='index-ggw'>
          <Image src={ggw} >
          </Image>
        </View>

      </View>
    )
  }
}

export default Index

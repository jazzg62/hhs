import { Component } from 'react'
import { View, Text, Image, Button, Input } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './scan.scss'

import Tags from '../../components/Tags';
import * as user_actions from '../../actions/user'
import * as pay_actions from '../../actions/pay'
import * as discount_actions from '../../actions/discount'
import * as store_actions from '../../actions/store'
import ggw from '../../assets/ggw.jpg'
import { isTrue } from '../../utils'

const stateToIndex = function (state) {
  return {
    store: state.store,
    user: state.user,
    pay: state.pay,
    discount: state.discount
  }
}

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...store_actions, ...pay_actions, ...user_actions, ...discount_actions }, dispatch)
})

@connect(
  stateToIndex,
  dispatchToProps
)
class Index extends Component {
  constructor(props) {
    super(props);
    let params = getCurrentInstance().router.params
    // store_id, member_id, phone 根据系统后台传入的值来决定
    if (isTrue(params['store_id'])){
      this.props.actions.getStoreInfo(params['store_id'], params['storeb_id']);
      this.props.actions.chongZhiYouHui(params['store_id'], params['storeb_id']);
    }
    if (isTrue(params['member_id']))
      this.props.actions.setUserMemberID(params['member_id']);
    if(isTrue(params['phone']))
      this.props.actions.setUserPhone(params['phone']);
    Taro.login({
      success: result => {
        this.props.actions.setLoginCode(result.code);
      }
    })
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleMoneyChange(event) {
    console.log(event)
    this.props.actions.setMoney(event.detail.value)
  }

  /**
   * 解密手机号
   * @returns
   */
  getPhoneNumber(e) {
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      Taro.request({
        url: 'https://pay.cnqilian.com/index.php?act=index1&op=getPhone',
        method: 'POST',
        data: {
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData,
          code: this.props.user.login_code,
          member_id: this.props.user.member_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      .then((res) => {
        if (res.data['state'] == 1)
          this.props.actions.setUserPhone(res.data['phone']);
        this.handlePayClick();
      })
    } else {
      console.warn('用户取消了授权');
      this.handlePayClick();
    }
  }

  handlePayClick() {
    let { money } = this.props.pay;
    money = Number(money);
    if(Number.isNaN(money)){
      Taro.showModal({
        title:'注意',
        content:'请输入正确的支付金额！'
      })
      return ;
    }
    if (money < 0.01) {
      Taro.showModal({
        title: '注意',
        content: '支付金额不能为0'
      })
      return;
    }
    Taro.showLoading({
      title: '加载中...'
    });
    this.props.actions.getDiscount(money)
  }

  pay(is_cz) {
    return () => {
      this.props.actions.setCZ(is_cz);
      this.handlePayClick();
    }
  }

  phone(is_cz) {
    return (e) => {
      this.props.actions.setCZ(is_cz);
      this.getPhoneNumber(e);
    }
  }

  render() {
    const storeInfo = this.props.store;
    const payInfo = this.props.pay;
    let phone = this.props.user.phone;

    if (storeInfo.store_id == 0) {
      return <View />
    }

    let submitButton = '';
    let chongZhiButton = '';

    if (isTrue(phone)) {
      submitButton = <Button className='index-pay__button' onClick={this.pay(0).bind(this)} >支付</Button>
      chongZhiButton = <Button className='index-chongzhi__button' onClick={this.pay(1).bind(this)} >在线充值</Button>
    } else {
      submitButton = <Button openType='getPhoneNumber'
        onGetphonenumber={this.phone(0).bind(this)} className='index-pay__button'
      >支付</Button>
      chongZhiButton = <Button openType='getPhoneNumber'
        onGetphonenumber={this.phone(1).bind(this)} className='index-chongzhi__button'
      >在线充值</Button>
    }

    return (
      <View className='index'>
        <View className='index-top__banner'></View>
        <View className='index-store__block' id={storeInfo.store_id}>
          <Image className='index-store__avatar'
            src={storeInfo.store_avatar}
          />
          <View className='index-store__name'>
            <Text >{storeInfo.store_name}</Text>
            <Text className='index-store__fdmc'>{storeInfo.fdmc}</Text>
          </View>
        </View>

        <Tags></Tags>

        <View className='index-line-gray'></View>

        <View className='index-input'>
          <Text>付款金额:</Text>
          <Input type='digit' placeholder='请输入支付金额' value={payInfo.money} onInput={this.handleMoneyChange.bind(this)} />
        </View>

        {submitButton}

        {chongZhiButton}

        <View className='index-ggw'>
          <Image src={ggw} >
          </Image>
        </View>

      </View>
    )
  }
}

export default Index

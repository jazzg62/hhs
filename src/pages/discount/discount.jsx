import { Component } from 'react'
import { View, Text, Button, Image } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import './discount.scss'
import * as discount from '../../actions/discount'
import * as pay from '../../actions/pay'
import toPay from '../../utils/pay';
import circle_normal from '../../assets/icons/circle-normal.svg';
import circle_checked from '../../assets/icons/circle-checked.svg';
import zaixian from '../../assets/icons/zaixian.svg';
import chongzhi from '../../assets/icons/chongzhi.svg';
import { Payment } from '../../constant';
import { calcZK, toFixed2 } from '../../utils';


const stateToIndex = function (state) {
  return {
    store: state.store,
    user: state.user,
    pay: state.pay,
    discount: state.discount
  }
}

const dispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...discount, ...pay, toPay }, dispatch)
})

@connect(
  stateToIndex,
  dispatchToProps
)
class Index extends Component {
  constructor(props) {
    super(props);
    if (this.props.discount.predeposit > 0 && this.props.discount.is_hyk == 0) {
      this.props.actions.changeRedEnvelop(1);
    }
    else {
      this.props.actions.changeRedEnvelop(0);
      if (this.props.discount.czye == 0 && this.props.discount.is_hyk == 0 && this.props.discount.xfq == 0)
        this.props.actions.toPay();
    }
  }

  componentWillMount() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleXFLXClick(xflx) {
    return function () {
      this.props.actions.changeXFLX(xflx);
    }
  }

  handleRedEnvelopClick() {
    if (this.props.pay.use_red_envelop == 0)
      this.props.actions.changeRedEnvelop(1);
    else
      this.props.actions.changeRedEnvelop(0);
  }

  handleXFQClick(){
    if(this.props.pay.use_xfq == 0)
      this.props.actions.changeXFQ(1);
    else
      this.props.actions.changeXFQ(0);
  }

  handlePayClick() {
    if (this.props.pay.use_red_envelop == 1 && this.props.pay.xflx == Payment.SM_XS) {
      Taro.redirectTo({
        url: '/pages/password/password'
      })
    } else {
      // 调起支付；
      this.props.actions.toPay();
    }
  }

  render() {
    let xflx = this.props.pay.xflx;
    let use_red_envelop = this.props.pay.use_red_envelop;
    let use_xfq = this.props.pay.use_xfq;
    let align_left = true;

    // 1.计算现金券
    let xjq_me = Number(this.props.discount.xjq_me) || 0;
    let xjq = Number(this.props.discount.xjq) || 0;
    let xjq_bl = Number(this.props.discount.xjq_bl);
    let xjqText = null;
    if (xjq_bl != 0) {
      xjq_me = this.props.pay.money * xjq_bl
    }
    let xjq_dk = xjq_me > xjq ? xjq : xjq_me; // 现金券可抵扣的部分
    if (xjq_dk != 0) {
      xjqText = <View className='row'>
      <View className='left'></View>
      <View className='right'>
        <View className='red'>消费券抵扣{xjq_dk}元</View>
      </View>
    </View>
    }

    // 1.1.计算优惠券
    let yhq_me = this.props.discount.xfq;
    let yhqText = null;
    if(yhq_me > 0){
      yhqText = <View className='row' onClick={this.handleXFQClick.bind(this)}>
        <View className='left'><Image className='icon-small check' src={use_xfq ? circle_checked : circle_normal}></Image></View>
        <View className='right'>
          <View className='red'>优惠券抵扣{yhq_me}元</View>
        </View>
      </View>
      align_left = false;
    }

    // 2.计算动态股东折扣
    let dtgd_zk = this.props.discount.dtgd_zk;
    let dtgd_zkText = null;
    if (dtgd_zk < 100)
      dtgd_zkText = <View className='row'>
      <View className='left'></View>
      <View className='right'>
        <View className='red'>享受共享股东{calcZK(dtgd_zk)}优惠</View>
      </View>
    </View>

    // 3.计算红包
    let predeposit = this.props.discount.predeposit;
    let is_hyk = this.props.discount.is_hyk;
    let predepositText = null;
    let hykText = null;
    let hyk_text = this.props.discount.hyk_text;
    let { money } = this.props.pay;
    let xfje = 0;
    if(use_xfq)
      xfje = (money - yhq_me - xjq_dk) * dtgd_zk / 100; // 扣除优惠券的部分
    else
      xfje = (money - xjq_dk) * dtgd_zk / 100;
    let discountedPredeposit = predeposit > xfje ? xfje : predeposit;
    if (predeposit > 0 && is_hyk == 0) {
      predepositText = <View className='row' onClick={this.handleRedEnvelopClick.bind(this)}>
        <View className='left'>
          <Image className='icon-small check' src={use_red_envelop ? circle_checked : circle_normal}></Image>
        </View>
        <View className='right'>
          使用<Text className='red'>红包{toFixed2(discountedPredeposit)}</Text>元
        </View>
      </View>
      align_left = false;
    } else if (is_hyk == 1) {
      hykText = <View className='row'>
        <View className='left'></View>
        <View className='right'>
          <Text className='text gray'>{hyk_text}</Text>
        </View>
      </View>
    }

    let yhxx = '';
    if (xflx != Payment.SM_CZ && (predepositText || hykText || yhqText || xjqText || dtgd_zkText )) {
      yhxx = <View className={'discount-info '+ (align_left?'align-left':'')}>
        {predepositText} {hykText}
        {yhqText}
        {xjqText}
        {dtgd_zkText}
      </View>;
    }

    return (
      <View className='discount'>
        <View className='discount-top__banner'></View>

        <View className={'discount-type ' + (xflx == Payment.SM_XS ? 'discount-type_selected' : '')} onClick={this.handleXFLXClick(Payment.SM_XS).bind(this)} type={Payment.SM_XS}>
          <Image className='icon-middle discount-type_icon' src={zaixian}></Image>
          <Text className='discount-type__text' >在线支付</Text>
          <Image className='icon-small discount-type__check' src={xflx == Payment.SM_XS ? circle_checked : circle_normal}></Image>
        </View>

        {this.props.pay.is_cz != 1 ?
          <View className={'discount-type ' + (xflx == Payment.SM_CZ ? 'discount-type_selected' : '')} onClick={this.handleXFLXClick(Payment.SM_CZ).bind(this)} type={Payment.SM_CZ}>
            <Image className='icon-middle discount-type_icon' src={chongzhi}></Image>
            <Text className='discount-type__text' >充值支付</Text>
            <Image className='icon-small discount-type__check' src={xflx == Payment.SM_CZ ? circle_checked : circle_normal}></Image>
          </View>
          : ''
        }

        {yhxx}

        <Button className='discount-pay' onClick={this.handlePayClick.bind(this)}>发起支付</Button>
      </View>
    )
  }
}

export default Index

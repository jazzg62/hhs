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
    if(this.props.discount.predeposit != 0){
      this.props.actions.changeRedEnvelop(1);
    }else{
      this.props.actions.changeRedEnvelop(0);
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
    if(this.props.pay.use_red_envelop)
      this.props.actions.changeRedEnvelop(1);
    else
      this.props.actions.changeRedEnvelop(0);
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

    // 1.计算现金券
    let xjq_me = Number(this.props.discount.xjq_me) || 0;
    let xjq = Number(this.props.discount.xjq) || 0;
    let xjq_bl = Number(this.props.discount.xjq_bl);
    let xjqText = '';
    if(xjq_bl != 0){
      xjq_me = this.props.pay.money * xjq_bl
    }
    let xjq_dk = xjq_me > xjq ? xjq : xjq_me; // 现金券可抵扣的部分
    if (xjq_dk != 0) {
      xjqText = <Text className='discount-red__envelop__info__text discount-red__envelop__info__red'>
        消费券抵扣{xjq_dk}元
                </Text>
    }

    // 2.计算动态股东折扣
    let dtgd_zk = this.props.discount.dtgd_zk;
    let dtgd_zkText = '';
    if (dtgd_zk < 100)
      dtgd_zkText = <Text className='discount-red__envelop__info__text discount-red__envelop__info__red'>
        享受共享股东{calcZK(dtgd_zk)}优惠
                    </Text>;

    // 3.计算红包
    let predeposit = this.props.discount.predeposit;
    let predepositText = '';
    let { money } = this.props.pay;
    let xfje = (money - xjq_dk) * dtgd_zk / 100;
    let discountedPredeposit = predeposit > xfje ? xfje : predeposit;
    if (predeposit != 0) {
      predepositText = <Text className='discount-red__envelop__info__text' >
        使用<Text className='discount-red__envelop__info__red'>红包{toFixed2(discountedPredeposit)}</Text>元
                      </Text>
    }

    let yhxx = '';
    if (xflx != Payment.SM_CZ && (predepositText != '' || xjqText != '' && dtgd_zkText != '')) {
      yhxx = <View className='discount-red__envelop' onClick={this.handleRedEnvelopClick.bind(this)}>
        <View className='discount-red__envelop_check'>
          <Image className='icon-small discount-type__check' src={use_red_envelop ? circle_checked : circle_normal}></Image>
        </View>

        <View className='discount-red__envelop__info'>
          {predepositText}
          {xjqText}
          {dtgd_zkText}
        </View>
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

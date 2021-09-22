import { Component } from 'react'
import { View, Text, Image, Button, Input } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './scan.scss'

import Tags from '../../components/Tags';
import NumberKeyboard from '../../components/NumberKeyboard';
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
    // store_id,根据系统后台传入的值来决定
    if (isTrue(params['store_id']) || isTrue(params['sn'])) {
      this.props.actions.getStoreInfo(params['store_id'], params['storeb_id'], params['sn']);
    }

    this.state ={
      showNumberKeyboard:false
    }

    my.getAuthCode({
      scopes: ['auth_base'],
      // 主动授权：auth_user，静默授权：auth_base或者其它scope。如需同时获取用户多项授权，可在 scopes 中传入多个 scope 值。
      success: (res) => {
        if (res.authCode) {
          this.props.actions.setLoginCode(res.authCode);
          Taro.request({
            method: "POST",
            url: "https://pay.cnqilian.com/index.php?act=index3&op=alipay_getmemberid",
            data: {
              code:res.authCode
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            }
          })
          .then((res1)=>{
            res1 = res1.data;
            this.props.actions.setUserId(res1.user_id);
            if(res1['member_id'] && res1['member_id']!='-1'){
              this.props.actions.setUserMemberID(res1['member_id']);
            }
            if(res1['member_mobile'] && res1['member_mobile']!='-1'){
              this.props.actions.setUserPhone(res1['member_mobile']);
            }
          })
        }
      },
    });
  }

  showNumberKeyboard(){
    this.setState({
      showNumberKeyboard:true
    })
  }

  hideNumberKeyboard(){
    this.setState({
      showNumberKeyboard:false
    })
  }

  handleMoneyChange(val) {
    this.props.actions.setMoney(this.props.pay.money+''+val);
  }

  handleMoneyDel(){
    let money = (this.props.pay.money+'').split('');
    money.pop();
    this.props.actions.setMoney(money.join(''));
  }

  /**
   * 请求后端，获取手机号信息
   * @param {*} res
   */
  getPhone(res){
    Taro.request({
      method: "POST",
      url: "https://pay.cnqilian.com/index.php?act=index3&op=alipay_getPhone",
      data: {
        user_id:this.props.user.user_id,
        encryptedData:JSON.parse(res.response)['response']
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      }
    })
    .then((res1)=>{
      res1 = res1.data;
      if(res1['member_id'] && res1['member_id']!='-1'){
        this.props.actions.setUserMemberID(res1['member_id']);
      }
      if(res1['member_mobile'] && res1['member_mobile']!='-1'){
        this.props.actions.setUserPhone(res1['member_mobile']);
      }
      this.handlePayClick();
    })
  }

  /**
   * 解密手机号
   * @returns
   */
  getPhoneNumber() {
    my.getPhoneNumber({
      success: this.getPhone.bind(this),
      fail: this.getPhone.bind(this),
    });
  }

  handlePayClick() {
    this.hideNumberKeyboard();
    let { money } = this.props.pay;
    money = Number(money);
    if (Number.isNaN(money)) {
      Taro.showModal({
        title: '注意',
        content: '请输入正确的支付金额！',
        showCancel:false
      })
      return;
    }
    if (money < 0.01) {
      Taro.showModal({
        title: '注意',
        content: '支付金额不能为0',
        showCancel:false
      })
      return;
    }
    Taro.showLoading({
      title: '加载中...',
      mask:true
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
      return null
    }

    let submitButton = '';
    let chongZhiButton = '';

    if (isTrue(phone)) {
      submitButton = <Button className='index-pay__button' onClick={this.pay(0).bind(this)} >支付</Button>
      chongZhiButton = <View className='index-chongzhi__button'><Button className='index-chongzhi__button-inline'  onClick={this.pay(1).bind(this)} >在线充值</Button></View>
    } else {
      submitButton = <Button scope='phoneNumber' openType='getAuthorize' onGetAuthorize={this.phone(0).bind(this)} className='index-pay__button' >支付</Button>
      chongZhiButton = <View className='index-chongzhi__button'>
        <Button className='index-chongzhi__button-inline' scope='phoneNumber' openType='getAuthorize' onGetAuthorize={this.phone(1).bind(this)}  >在线充值</Button>
        </View>
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

        <View className='index-input' onClick={this.showNumberKeyboard.bind(this)}>
          <Text className='index-input__text'>付款金额:</Text>
          <Input className='index-input__input' type='digit' placeholder='请输入付款金额' value={payInfo.money}   disabled />
        </View>

        {submitButton}

        {chongZhiButton}

        <View className='index-ggw'>
          <Image className='index-ggw__image' src={ggw} >
          </Image>
        </View>

        <NumberKeyboard show={this.state.showNumberKeyboard} keyList={[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0]} showSidebar  input={this.handleMoneyChange.bind(this)} delete={this.handleMoneyDel.bind(this)} done={this.hideNumberKeyboard.bind(this)} blur={this.hideNumberKeyboard.bind(this)} />
      </View>
    )
  }
}

export default Index

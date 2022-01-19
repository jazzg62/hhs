import { Component } from 'react'
import Taro from '@tarojs/taro';
import { View, Text ,Input } from '@tarojs/components';
import './withdraw.scss'


class Index extends Component {
  constructor(props) {
    super(props);
    this.state ={
      ktxye: '0.00',
      member_truename:'   ',
      money:'',
    }
  }

  componentWillMount () {
    this.get_member_truename();
    this.get_account_balance();
  }

  get_member_truename(){
    Taro.request({
      url:'https://www.cnql888.com/mobile/index.php?act=member_fund&op=member_xx',
      data:{
        key: Taro.getApp().globalData.key,
      },
      success: (res)=>{
        console.log(res);
        this.setState({
          member_truename: res.data.datas.member_truename,
        })
      }
    })
  }

  get_account_balance(){
    Taro.request({
      url:'https://www.cnql888.com/mobile/index.php?act=member_tk&op=tk_account',
      data:{
        key: Taro.getApp().globalData.key,
      },
      success: (res)=>{
        console.log(res);
        this.setState({
          ktxye:  res.data.datas.account_info.zhye,
        })
      }
    })
  }

  withdraw(){
    if(this.state.money == ''){
      Taro.showModal({
        title: '提示',
        showCancel:false,
        content:'请输入提现金额',
      })
      return ;
    }
    if(this.state.money<1.5){
      Taro.showModal({
        title: '提示',
        showCancel:false,
        content:'提现金额不能于1.5元',
      })
      return ;
    }
    if(this.state.money>this.state.ktxye){
      Taro.showModal({
        title: '提示',
        showCancel:false,
        content:'提现金额不能大于可提现余额',
      })
      return ;
    }
    Taro.request({
      method:'POST',
      url:'https://www.cnql888.com/mobile/index.php?act=member_tk&op=tk_tx',
      data:{
        key: Taro.getApp().globalData.key,
        txje: this.state.money,
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res)=>{
        console.log(res);
        if(res.data.datas.error){
          Taro.showModal({
            title: '提示',
            content:res.data.datas.error,
            showCancel:false,
          })
          return ;
        }
        Taro.showModal({
          title: '提示',
          content:'提现成功',
          showCancel:false,
        });
        this.setState({
          money:''
        })
        this.get_account_balance();
      }
    })
  }

  onInputMoney(e){
    this.setState({
      money: e.detail.value
    })
  }

  navigate_list(){
    Taro.navigateTo({
      url:'/pages/withdrawList/withdrawList'
    })
  }

  navigate_setting(){
    Taro.navigateTo({
      url:'/pages/memberInfoSetting/memberInfoSetting'
    })
  }

  render() {
    return (
      <View class='content' id='slot1'>
        <View class='row ktx-row'>
            <Text className='h2'>可提现余额：{this.state.ktxye}</Text>
            <View className='a' onClick={this.navigate_list.bind(this)}>查看提现记录</View>
        </View>
        <View class='row input-row'>
            <Text className='h3'>￥</Text>
            <Input className='input' type='number' id='money' name='money' value={this.state.money} onInput={this.onInputMoney.bind(this)} placeholder='请输入需要提现金额' />
        </View>
        <View class='row des-row'>
            <Text className='h3'>
                提现至:
            </Text>
            <Text className='h3' id='yhm'>{this.state.member_truename} 的微信账户</Text>
            <Text className='h3' id='yhhh'> </Text>
            <Text className='a' onClick={this.navigate_setting.bind(this)}>设置</Text>
        </View>
        <View class='row submit-row'>
            <Text className='button' onClick={this.withdraw.bind(this)}>提现</Text>
        </View>
        <View class='tips-row hint'>
            <View className='h2'>温馨提示：</View>
            <View className='p'>1.提现金额的20%到账红包，80%到账微信零钱。</View>
            <View className='p'>2.实时到账该账号所绑定的微信账户，请确定个人信息中所填写姓名与微信所绑定的身份证姓名一致，否则会有可能打款失败。个人信息可点击设置进行修改。</View>
            <View className='p'>3.点击提现时，提示接口出现异常，这可能是微信端支付系统出现错误，会出现延时到账的情况，可稍后检查下微信支付零钱，如30分钟内也未到账微信支付零钱时，请联系客服反馈，客服工作时间每周一到周六8:30~17:00，联系方式 400-667-0515。</View>
        </View>
    </View>
    )
  }
}

export default Index

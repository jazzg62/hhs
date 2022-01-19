import { Component } from 'react'
import Taro from '@tarojs/taro';
import { View, Text, Input } from '@tarojs/components';
import './memberInfoSetting.scss'


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form:{
        name:'',
        bank_name:'',
        bank_account:'',
        key:Taro.getApp().globalData.key
      }
    }
  }

  componentWillMount() {
    this.request_member_info();
  }

  request_member_info() {
    let {key} = this.state.form;
    Taro.request({
      url: 'https://www.cnql888.com/mobile/index.php?act=member_fund&op=member_xx',
      data: {key:key},
      success: (res) => {
        console.log(res);
        this.setState({
          form:{
            key:key,
            name:res.data.datas.member_truename,
            bank_name:res.data.datas.bankinfo,
            bank_account:res.data.datas.bankid.replace(/(\d{4})(?=[^\s])/g, "$1 "),
          }
        })
      }
    })
  }

  onInput(e){
    console.log(e);
    let { name } = e.currentTarget.dataset;
    let {value} = e.target;
    if(name=='bank_account'){
      value = value.trim();
      value = value.replace(/(\d{4})(?=[^\s])/g, "$1 ");
    }
    this.setState({
      form:{
        ...this.state.form,
        [name]:value
      }
    })
  }

  onSubmit(){
    let {key, name, bank_name, bank_account} = this.state.form;
    Taro.showModal({
      title: '提示',
      content:'确定提交个人信息吗？错误的个人信息可能会导致提现不到账！！！',
      success:(res)=>{
        if(res.confirm){
          Taro.request({
            method: 'GET',
            url: 'https://www.cnql888.com/mobile/index.php?act=member_fund&op=member_yhxx',
            data: {
              key: key,
              bank_hm:name,
              bank_khh:bank_name,
              bank_no:bank_account.replace(/\s*/g, '')
            },
            success: (res1) => {
              if(res1.data.datas==1){
                Taro.showModal({
                  showCancel:false,
                  title: '提示',
                  content:'修改成功',
                })
                this.request_member_info();
              }
            }
          })
        }
      }
    })
  }

  render() {
    let {name} = this.state.form;
    return (
      <View class='content' >
        <View class='yhk-form'>
            <View className='column'>
                <Text className='tag'>真实姓名</Text>
                <Input className='input' type='text' value={name} data-name='name' onInput={this.onInput.bind(this)} />
            </View>
            {/* <View className='column'>
                <Text className='tag'>开户行名称</Text>
                <Input className='input' type='text' value={bank_name} data-name='bank_name' onInput={this.onInput.bind(this)} />
            </View>
            <View className='column'>
                <Text className='tag'>银行账号</Text>
                <Input className='input' type='number' value={bank_account} data-name='bank_account' onInput={this.onInput.bind(this)} />
            </View> */}
            <View className='row'>
                <View class='submit' onClick={this.onSubmit.bind(this)}>提交个人信息</View>
            </View>
        </View>
    </View>
    )
  }
}

export default Index

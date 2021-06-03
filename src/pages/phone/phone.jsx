import { View, Image, Text, Button } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './phone.scss'

@withWeapp({
  /**
   * 页面的初始数据
   */
  data: {
    key: '',
    loginCode: ''
  },
  getPhoneNumber(e) {
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      console.log('用户授权了获取手机号')
      Taro.request({
        url:
          'https://new.cnqilian.com/mobile/index.php?act=member_fund&op=getPhone',
        method: 'POST',
        data: {
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData,
          code: this.data.loginCode,
          key: this.data.key
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          console.log(res)
          // 错误提示
          if (res.data.datas['error']) {
            Taro.showModal({
              title: '提示',
              content: res.data.datas['error'] + '',
              success: () => {
                Taro.navigateBack({
                  delta: 0
                })
              }
            })
            return
          }
          // 成功提示
          Taro.showModal({
            title: '提示',
            content: '成功授权绑定手机号',
            success: () => {
              if (res.confirm) {
                let src = 'https://new.cnqilian.com/wap/gyl/my.html'
                src = encodeURIComponent(src)
                Taro.reLaunch({
                  url: '/pages/index/index?src=' + src
                })
              } else {
                Taro.navigateBack({
                  delta: 0
                })
              }
            }
          })
        }
      })
    } else {
      // 对取消授权手机号进行判断
      console.log('用户取消授权了手机号，暂时不做操作！')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Taro.login({
      success: res => {
        if (res.code) {
          console.log(res.code)
          this.setState({ loginCode: res.code })
        }
      }
    })
    this.setState({ key: options.key })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
})
class _C extends React.Component {
  render() {
    return (
      <View className='fullscreen center'>
        <Image
          className='user-img'
          src={require('../../assets/user.png')}
        ></Image>
        <View className='des'>
          <Text>
            你可以在这里授权手机号，授权手机号后会自动绑定当前账号。在手机号绑定后会自动同步您的数据。
          </Text>
        </View>
        <View className='op'>
          <Button
            className='phone'
            openType='getPhoneNumber'
            onGetphonenumber={this.getPhoneNumber}
          >
            授权手机号
          </Button>
        </View>
      </View>
    )
  }
} // pages/mobile/mobile.js

export default _C

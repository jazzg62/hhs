import { View, Text } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './pay.scss'

@withWeapp({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options)
    // 引入wexin.js
    // 传参到支付页
    // 获取code
    // 然后参数和code传到后台
    // 发起支付
    // 跳转到赋商页

    // 获取登录code
    Taro.login({
      success(res) {
        if (res.code) {
          var decode = decodeURIComponent
          let data = Object.assign(options, {
            code: res.code
          })
          console.log(data)
          Taro.showLoading({
            title: '发起支付中'
          })

          const ApiUrl = 'https://new.cnqilian.com/mobile'
          let apiAct, apiOp
          apiAct = !options.apiAct ? 'fswxpay' : options.apiAct
          apiOp = !options.apiOp ? 'xdfsx' : options.apiOp
          let url = ApiUrl + '/index.php?act=' + apiAct + '&op=' + apiOp
          Taro.request({
            url: url,
            data: data,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: res => {
              Taro.hideLoading()
              const result = res.data.datas.result

              // 处理支付
              Taro.requestPayment({
                signType: result.signType,
                nonceStr: result.nonceStr,
                package: result.package,
                paySign: result.paySign,
                timeStamp: result.timeStamp,
                success(res) {
                  Taro.showToast({
                    title: '支付成功！'
                  })
                  let src = ''
                  if (/fswxpay/.test(apiAct)) {
                    src = 'https://new.cnqilian.com/wap/fs'  // 赋商页
                  } else {
                    if (!options.src)
                      src = 'https://new.cnqilian.com/wap/tmpl/member/order_list.html'  // 订单列表
                    else src = decodeURIComponent(options.src)
                  }
                  src = encodeURIComponent(src)
                  Taro.reLaunch({
                    url: '/pages/index/index?src=' + src
                  })
                },
                fail(res) {
                  if (res == 'requestPayment:fail cancel') {
                    Taro.showModal({
                      title: '用户取消了支付',
                      content: '需要返回缘粉中心吗',
                      success: res => {
                        if (res.confirm) {
                          let src = 'https://new.cnqilian.com/wap/gyl/my.html'
                          Taro.reLaunch({
                            url: '/pages/index/index?src=' + encodeURIComponent(src)
                          })
                        } else {
                          Taro.navigateBack({
                            delta: 0
                          })
                        }
                      }
                    })
                    return
                  }

                  console.warn('出现其他错误！')
                  Taro.showModal({
                    title: '支付失败',
                    content: '需要返回缘粉中心吗',
                    success: res => {
                      if (res.confirm) {
                        let src = 'https://new.cnqilian.com/wap/gyl/my.html'
                        Taro.reLaunch({
                          url: '/pages/index/index?src=' + encodeURIComponent(src)
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
            }
          })
        } else {
          console.error('获取用户code失败！')
        }
      }
    })
  },
})
class Index extends React.Component {
  render() {
    const { appId, timeStamp, nonceStr, signType, paySign } = this.data
    const _package = this.data['package'];
    return (
      <View className='hide'>
        <Text>{'appId:     ' + appId}</Text>
        <Text>{'timeStamp:     ' + timeStamp}</Text>
        <Text>{'nonceStr:   ' + nonceStr}</Text>
        <Text>{'package:  ' + _package}</Text>
        <Text>{'signType:  ' + signType}</Text>
        <Text>{'paySign:  ' + paySign}</Text>
      </View>
    )
  }
} // pages/pay/pay.js

export default Index

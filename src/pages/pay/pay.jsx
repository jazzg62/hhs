import { View, Text } from '@tarojs/components'
import React from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import './pay.scss'

class Index extends React.Component {
  constructor(props){
    super(props);
    let options = getCurrentInstance().router.params;
    this.state = {
      ...options
    };

    // 传参到支付页
    // 获取code
    // 然后参数和code传到后台
    // 发起支付
    // 跳转到赋商页

    // 获取登录code
    Taro.login({
      success(res) {
        if (res.code) {
          let data = Object.assign({},options, {
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

  }

  render() {
    const { appId, timeStamp, nonceStr, signType, paySign } = this.state
    const _package = this.state['package'];
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

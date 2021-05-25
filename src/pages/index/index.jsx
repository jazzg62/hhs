import { WebView } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'

@withWeapp({
  data: {
    src: 'https://new.cnqilian.com/wap/gyl/index.html'
  },

  onLoad: function(options) {
    if (options && options['src'] != undefined) {
      var src = decodeURIComponent(options.src)
      src = src.replace(/http:\/\//, 'https://')
      this.setData({
        src: src
      })
    }
  },

  onReady: function() {},

  //定义此方法之后，点击右上角按钮弹出的菜单中"发送给朋友"菜单变为可点击
  onShareAppMessage: function(param) {
    var { webViewUrl } = param
    console.log(webViewUrl)
    try {
      var reg = /goods_name=([^&]*)(&|$)/
      var goods_name = decodeURIComponent(reg.exec(webViewUrl)[1])
      if (goods_name) {
        return {
          title: goods_name,
          path: '/pages/index/index?src=' + encodeURIComponent(webViewUrl)
        }
      }
    } catch (e) {
      return {
        title: '消费当股东 天天享分红',
        path: '/pages/index/index?src=' + encodeURIComponent(webViewUrl)
      }
    }
  },

  // 记录错误到服务器
  errorHandler: function(e) {
    var data = {
      type: '企联商务 加载出错',
      error: JSON.stringify(e.detail)
    }
    Taro.request({
      url: 'https://new.cnqilian.com/mobile/index.php?act=index&op=sysLog',
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.error('已记录错误')
      }
    })
  }
})
class _C extends React.Component {
  render() {
    const { src } = this.data
    return <WebView src={src} onError={this.errorHandler}></WebView>
  }
}

export default _C

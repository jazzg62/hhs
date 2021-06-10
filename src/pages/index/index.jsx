import { WebView } from '@tarojs/components'
import React from 'react'
import Taro,{getCurrentInstance} from '@tarojs/taro'

class Index extends React.Component {
  constructor(props){
    super(props);
    let params = getCurrentInstance().router.params
    let src = params['src'] || '';
    src.replace(/http:\/\//, 'https://');
    src = decodeURIComponent(src);
    this.state = {
      src: src || 'https://new.cnqilian.com/wap/gyl/index.html'
    }
  }

  // 记录错误到服务器
  errorHandler(e) {
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

  //定义此方法之后，点击右上角按钮弹出的菜单中"发送给朋友"菜单变为可点击
  onShareAppMessage(param) {
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
  }

  render() {
    const { src } = this.state;
    return <WebView src={src} onError={this.errorHandler.bind(this)}></WebView>
  }
}

export default Index

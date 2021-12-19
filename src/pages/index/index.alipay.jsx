import { WebView } from '@tarojs/components'
import React from 'react'
import { getCurrentInstance } from '@tarojs/taro'
import { alipay_login } from '../../utils/platform';

class Index extends React.Component {
  constructor(props) {
    super(props);
    let params = getCurrentInstance().router.params
    let src = params['src'] || '';
    src.replace(/http:\/\//, 'https://');
    src = decodeURIComponent(src);
    this.state = {
      src: src || 'https://www.cnql888.com/wap/alipay1/business.html'
    };
  }

  onMessage(e) {
    let { type } = e.detail;
    console.log('onMessage:', e);
    switch (type) {
      case 'alipay_login':
        alipay_login();
        break;
      default:
        console.log(e);
    }
  }

  render() {
    const { src } = this.state;
    return <WebView src={src} onMessage={this.onMessage.bind(this)} ></WebView>;
  }
}

export default Index

import { WebView } from '@tarojs/components'
import React from 'react'
import { getCurrentInstance } from '@tarojs/taro'

class Index extends React.Component {
  constructor(props) {
    super(props);
    let params = getCurrentInstance().router.params
    let src = params['src'] || '';
    src.replace(/http:\/\//, 'https://');
    src = decodeURIComponent(src);
    this.state = {
      src: src || 'https://new.cnqilian.com/wap/alipay1/business.html'
    };
  }

  render() {
    const { src } = this.state;
    return <WebView src={src} ></WebView>
  }
}

export default Index

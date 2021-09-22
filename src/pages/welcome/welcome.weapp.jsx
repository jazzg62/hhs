import { View } from '@tarojs/components'
import React from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import {parse} from 'querystring'
import './welcome.scss'

class Index extends React.Component {
  constructor(props){
    super(props);
    let re = /pay\.cnqilian\.com\/dist\/\?/;
    let src ='';
    let options = getCurrentInstance().router.params;
    if (options && options.q != undefined) {
      src = decodeURIComponent(options.q)
      if(re.test(src)){
        src = "https://new.cnqilian.com/mobile/index.php?act=connect&op=index_xcx&store_id="+(parse(src)['store_id']||0)+'&storeb_id='+(parse(src)['storeb_id']||0)+'&sn='+(parse(src)['sn']||0);
      }
      src = src.replace(/http:\/\//, 'https://')
      Taro.reLaunch({
        url: '/pages/index/index?src=' + encodeURIComponent(src)
      })
    }
  }
  render() {
    return <View>跳转中...</View>
  }
} // pages/welcome/welcome.js

export default Index

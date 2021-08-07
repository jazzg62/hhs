import React from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import {parse} from 'querystring'
import './welcome.scss'

class Index extends React.Component {
  constructor(props){
    super(props);
    let re = /pay\.cnqilian\.com\/dist\/\?name=store/;
    let src ='';
    let options = getCurrentInstance().router.params;
    if (options && options.q != undefined) {
      src = decodeURIComponent(options.q)
      if(re.test(src)){
        Taro.reLaunch({
          url:'/pages/scan/scan?store_id='+parse(src)['store_id']+'&storeb_id='+(parse(src)['storeb_id']||0)
        })
      }else{
        // 支付宝的扫码应该只支持扫码支付，锁粉类推广码应该在微信中使用
        Taro.showModal({
          content: '请使用微信扫码!',
          showCancel: false
        })
        .then(()=>{
          // src = src.replace(/http:\/\//, 'https://')
          Taro.reLaunch({
            url: '/pages/index/index'
          })
        })
      }
    }
  }
  render() {
    return null
  }
} // pages/welcome/welcome.js

export default Index

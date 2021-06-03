import { View } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import {parse} from 'querystring'
import './welcome.scss'

@withWeapp({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let re = /pay\.cnqilian\.com\/dist\/\?/;
    let src ='';
    if (options && options.q != undefined) {
      src = decodeURIComponent(options.q)
      if(re.test(src)){
        src = "https://new.cnqilian.com/mobile/index.php?act=connect&op=index_xcx&store_id="+parse(src)['store_id']+'&storeb_id='+(parse(src)['storeb_id']||0);
      }
      src = src.replace(/http:\/\//, 'https://')
      Taro.reLaunch({
        url: '/pages/index/index?src=' + encodeURIComponent(src)
      })
    }
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
class Index extends React.Component {
  render() {
    return <View>跳转中...</View>
  }
} // pages/welcome/welcome.js

export default Index

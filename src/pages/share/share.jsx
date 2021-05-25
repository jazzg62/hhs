import { View, Image } from '@tarojs/components'
import React from 'react'
import withWeapp from '@tarojs/with-weapp'
import './share.scss'

@withWeapp({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.src = options.src
    this.title = options.title
    this.imageUrl = options.imageUrl
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    let decode = decodeURIComponent
    return {
      title: decode(this.title),
      path: '/pages/index/index?src=' + this.src,
      imageUrl: decode(this.imageUrl)
    }
  },

  //定义此方法之后，点击右上角按钮弹出的菜单中"分享到朋友圈"按钮变为可点击
  onShareTimeline: function() {
    let decode = decodeURIComponent
    return {
      title: decode(this.title),
      path: '/pages/index/index?src=' + this.src,
      imageUrl: decode(this.imageUrl)
    }
  }
})
class Index extends React.Component {
  render() {
    return (
      <View className="fx">
        <Image
          className="fx_img"
          src={require('../../assets/sharemb1.png')}
        ></Image>
      </View>
    )
  }
} // pages/share/share.js

export default Index

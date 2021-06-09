import { View, Image } from '@tarojs/components'
import React from 'react'
import './share.scss'
import { getCurrentInstance } from '@tarojs/taro'

class Index extends React.Component {
  constructor(props){
    super(props);
    let options = getCurrentInstance().router.params;
    let src = options.src
    let title = options.title
    let imageUrl = options.imageUrl
    this.state = {
      src:src,
      title:title,
      imageUrl:imageUrl
    }
  }

  /**
   * 用户点击右上角分享
   */
   onShareAppMessage() {
    let decode = decodeURIComponent
    return {
      title: decode(this.state.title),
      path: '/pages/index/index?src=' + this.state.src,
      imageUrl: decode(this.state.imageUrl)
    }
  }

  //定义此方法之后，点击右上角按钮弹出的菜单中"分享到朋友圈"按钮变为可点击
  onShareTimeline() {
    let decode = decodeURIComponent
    return {
      title: decode(this.state.title),
      path: '/pages/index/index?src=' + this.state.src,
      imageUrl: decode(this.state.imageUrl)
    }
  }

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

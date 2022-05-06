import { Component } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro';

import './navigate.scss';

class Index extends Component {
  constructor(props) {
    super(props);
    let params = getCurrentInstance().router.params;
    this.state = {
      img: params['img'],
      title: params['title'],
      appId: params['appId'],
      path: decodeURIComponent(params['path'])
    }
  }

  handelClick() {
    wx.navigateToMiniProgram({
      appId: this.state.appId,
      path: this.state.path
    })
  }

  render() {
    let { state } = this;
    let img = decodeURIComponent(state.img);

    return (
      <View className='navigate'>
        <View className='navigate-content'>
          <Image className='navigate-content--img' src={img}></Image>
          <Text className='navigate-content--text' >即将跳转到{state.title}, 请点击确定后跳转</Text>
          <Button className='navigate-content--button' onClick={this.handelClick.bind(this)}>确定</Button>
        </View>
      </View>
    )
  }
}

export default Index

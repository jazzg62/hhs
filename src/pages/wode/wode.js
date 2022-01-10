import { View, Image, Text } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './wode.scss'

@withWeapp({
  data: {
    menuButtonBoundingClientRect: Taro.getMenuButtonBoundingClientRect(),
    member_name: '加载中...',
    member_des: '稍后会显示更多信息',
    member_avatar: 'https://www.cnql888.com/wap/image/qlpt1.jpg',
    wjs: '0.00',
    yjs: '0.00',
    zsy: '0.00'
  },
  onLoad() {
    const my = [
      '没有行动的承诺，不过是一席空话。',
      '没有所谓失败，除非你不再尝试。',
      '不相信奇迹的人永远都不会创造奇迹。',
      '生命的成长，需要吃饭，还需要吃苦，吃亏。',
      '当困苦姗姗而来之时，超越它们会更有余味。',
      '成功者永远不会言弃，放弃者永远不会成功。',
      '你必须成功，因为你不能失败。',
      '人活一天就要努力一天。',
      '对待生命要认真，对待生活要活泼。',
      '一个人没有钱不一定穷，但没有梦想那就穷定了。',
      '每天告诉自己一次，我真的很不错。'
    ]
    this.setData({
      member_des: my[new Date().getDay() % my.length]
    })
    this.request_my()
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  onPullDownRefresh() {
    this.request_my()
  },
  request_my() {
    let app = Taro.getApp()
    let { key } = app.globalData
    Taro.request({
      url:
        'https://www.cnql888.com/mobile/index.php?act=member_tk&op=tk_account',
      data: {
        key
      },
      success: res => {
        console.log('my', res)
        if (res.data.datas.res != 0) {
          return
        }
        let res_data = res.data.datas.account_info
        res_data['zsy'] = Number(res_data['zsy']).toFixed(2)
        res_data['wjs'] = Number(res_data['wjs']).toFixed(2)
        res_data['yjs'] = Number(res_data['yjs']).toFixed(2)
        this.setData(res_data)
        wx.stopPullDownRefresh();
      }
    })
  },
  navigate_zicangzhognxin() {
    let { zsy, yjs, wjs } = this.data
    Taro.navigateTo({
      url:
        '/pages/zichanmingxi2/zichanmingxi2?zsy=' +
        zsy +
        '&yjs=' +
        yjs +
        '&wjs=' +
        wjs
    })
  },
  navigate_dingdan(e) {
    console.log(e)
    let { lx } = e.currentTarget.dataset
    Taro.navigateTo({
      url: '/pages/quanbudingdan/quanbudingdan?lx=' + lx
    })
  },
  navigate_yf(){
    Taro.redirectTo({
      url: '/pages/index/index?src='+encodeURIComponent('https://www.cnql888.com/wap/gyl/my.html')
    })
  }
})
class _C extends React.Component {
  render() {
    const { member_avatar, member_name, member_des, zsy, yjs, wjs, menuButtonBoundingClientRect } = this.data
    return (
      <View className='flex-col page'>
        {/* <View className='navbar' style={
                'margin-top:' +
                menuButtonBoundingClientRect.top +
                'px;height: ' +
                menuButtonBoundingClientRect.height +
                'px;'
              }
        >
          <View className='navbar-left' onClick={this.navigate_yf}>切换缘粉中心</View>
          <View className='navbar-title'>我的</View>
        </View> */}
        <View className='flex-col group'>
          <View className='flex-row'>
            <Image src={member_avatar} className='image_4'></Image>
            <View className='flex-col group_2'>
              <Text decode='decode' className='text'>
                {member_name}
              </Text>
              <Text decode='decode' className='text_1'>
                {member_des}
              </Text>
            </View>
          </View>
          <View className='flex-col group_3'>
            <View
              className='flex-col section_2'
              onClick={this.navigate_zicangzhognxin}
            >
              <View className='justify-between'>
                <View className='flex-col'>
                  <Text decode='decode' className='text_2'>
                    总资产
                  </Text>
                  <View className='group_6'>
                    <Text decode='decode' className='text_3'>
                      ￥
                    </Text>
                    <Text decode='decode' className='text_4'>
                      {zsy}
                    </Text>
                  </View>
                </View>
                <Image
                  src={require('../../res/local/653b7150bf87d4d46c896d2458acfd7c.png')}
                  className='icon'
                ></Image>
              </View>
              <View className='flex-row group_7'>
                <View className='flex-row'>
                  <Text decode='decode' className='text_5'>
                    已结算
                  </Text>
                  <View className='right-group view_3'>
                    <Text decode='decode' className='text_6'>
                      ￥
                    </Text>
                    <Text decode='decode' className='text_8'>
                      {yjs}
                    </Text>
                  </View>
                </View>
                <Image
                  src={require('../../res/local/ec2bc6734c61060a857e5952304825b8.png')}
                  className='image_5'
                ></Image>
                <View className='justify-center group_9'>
                  <Text decode='decode' className='text_10'>
                    待结算
                  </Text>
                  <View className='right-group view_4'>
                    <Text decode='decode' className='text_6'>
                      ￥
                    </Text>
                    <Text decode='decode' className='text_8'>
                      {wjs}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              className='justify-between section_3'
              onClick={this.navigate_dingdan}
              data-lx='all'
            >
              <View className='flex-row'>
                <View className='flex-col items-center image-wrapper'>
                  <Image
                    src={require('../../res/local/8f0631adc64bd799ddd79e736f47cd88.png')}
                    className='image_6'
                  ></Image>
                </View>
                <View className='flex-col group_11'>
                  <Text decode='decode' className='text_13'>
                    全部订单
                  </Text>
                  <Text decode='decode' className='text_14'>
                    点击查看全部订单
                  </Text>
                </View>
              </View>
              <Image
                src={require('../../res/local/3d59f59f677c095bf1fc499dd6c7c1d4.png')}
                className='icon_1 image_7'
              ></Image>
            </View>
            <View
              className='justify-between section_4'
              onClick={this.navigate_dingdan}
              data-lx='1'
            >
              <View className='flex-row'>
                <View className='flex-col items-center image-wrapper_1'>
                  <Image
                    src={require('../../res/local/7e6a96c7504a07f83b80b0316d7ea606.png')}
                    className='image_8'
                  ></Image>
                </View>
                <View className='flex-col group_13'>
                  <Text decode='decode' className='text_15'>
                    待支付
                  </Text>
                  <Text decode='decode' className='text_16'>
                    点击查看待支付订单
                  </Text>
                </View>
              </View>
              <Image
                src={require('../../res/local/3d59f59f677c095bf1fc499dd6c7c1d4.png')}
                className='icon_1 image_9'
              ></Image>
            </View>
            <View
              className='justify-between section_5'
              onClick={this.navigate_dingdan}
              data-lx='2'
            >
              <View className='flex-row group_14'>
                <View className='flex-col group_15'>
                  <Text decode='decode' className='text_17'>
                    未使用
                  </Text>
                  <Text decode='decode' className='text_18'>
                    点击查看未使用订单
                  </Text>
                </View>
                <View className='flex-col items-center image-wrapper_2'>
                  <Image
                    src={require('../../res/local/b847236debd07af192b1d5d9629c21f8.png')}
                    className='icon_2'
                  ></Image>
                </View>
              </View>
              <Image
                src={require('../../res/local/3d59f59f677c095bf1fc499dd6c7c1d4.png')}
                className='icon_1 image_10'
              ></Image>
            </View>
            <View
              className='justify-between section_6'
              onClick={this.navigate_dingdan}
              data-lx='3'
            >
              <View className='flex-row group_16'>
                <View className='flex-col group_17'>
                  <Text decode='decode' className='text_19'>
                    已使用
                  </Text>
                  <Text decode='decode' className='text_20'>
                    点击查看已使用订单
                  </Text>
                </View>
                <View className='flex-col items-center image-wrapper_3'>
                  <Image
                    src={require('../../res/local/0deb15158eaf26fb93177daa4938bdc3.png')}
                    className='icon_3'
                  ></Image>
                </View>
              </View>
              <Image
                src={require('../../res/local/3d59f59f677c095bf1fc499dd6c7c1d4.png')}
                className='icon_1 image_11'
              ></Image>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default _C

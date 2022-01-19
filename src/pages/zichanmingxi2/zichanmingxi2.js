import { View, Image, Text, Button } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './zichanmingxi2.scss'

@withWeapp({
  data: {
    menuButtonBoundingClientRect: Taro.getMenuButtonBoundingClientRect(),
    zsy: '0.00',
    zhye: '0.00',
    list: []
  },
  onLoad(options) {
    let { zsy, zhye} = options
    this.setData({
      zsy,
      zhye,
    })
    this.request_order_list()
  },
  navigate_back() {
    Taro.navigateBack({
      delta: 0
    })
  },
  navigate_withdraw(){
    Taro.navigateTo({
      url:'/pages/withdraw/withdraw'
    })
  },
  set_clipboard(e) {
    let { data } = e.currentTarget.dataset
    Taro.setClipboardData({ data: data })
  },
  request_order_list() {
    let { key } = Taro.getApp().globalData
    Taro.request({
      url: 'https://www.cnql888.com/mobile/index.php?act=member_tk&op=sy_list',
      data: {
        key
      },
      success: res => {
        console.log('order_list', res.data)
        this.setData({
          list: res.data.datas.list
        })
      }
    })
  }
})
class _C extends React.Component {
  render() {
    const { menuButtonBoundingClientRect, zsy, zhye, list } = this.data
    return (
      <View className='flex-col page'>
        <View className='flex-col group'>
          <View
            className='justify-center section_1'
            style={
              'padding-top: ' +
              menuButtonBoundingClientRect.top +
              'px;position: relative;box-sizing: content-box;height: ' +
              menuButtonBoundingClientRect.height +
              'px;'
            }
            onClick={this.navigate_back}
          >
            <Image
              src={require('../../res/local/feadbac5b37119c9f99281a24bdf6d3b.png')}
              className='icon'
              style={'top: ' + (menuButtonBoundingClientRect.top + 5) + 'px;'}
            ></Image>
            <Text decode='decode' style='display:flex;align-items: center;'>
              资产明细
            </Text>
          </View>
          <View className='balance'>
            <View className='balance-column'>
              <Text className='balance-des'>总收入</Text>
              <Text className='balance-price'>{this.data.zsy}</Text>
            </View>
            <View className='balance-column'>
              <Text className='balance-des'>可提现</Text>
              <View className='balance-price'>{this.data.zhye} <Text className='balance-withdraw' onClick={this.navigate_withdraw}>提现</Text></View>
            </View>
          </View>
        </View>
        <View className='flex-col list'>
          {list.map((item) => {
            return (
              <View className='list-item flex-col' key='index'>
                <View className='top-group flex-col'>
                  <View className='flex-row'>
                    <Text className='image_10'>{'订单号：' + item.ddh}</Text>
                    <Image
                      src={require('../../res/local/e0b2903c528d1214e8d902773b21a6f5.png')}
                      className='icon_1'
                    ></Image>
                  </View>
                  <View className='bottom-group flex-row'>
                    <Image src={item.goods_pic} className='image_13'></Image>
                    <View className='right-group flex-col'>
                      <Text decode='decode' className='text_2'>
                        {item.goods_name}
                      </Text>
                      <Text decode='decode' className='text_1'>
                        {item.goods_des}
                      </Text>
                    </View>
                  </View>
                </View>
                <Image
                  src={require('../../res/local/4b27898b0453dcdc53fb8ae067292221.png')}
                  className='image_15'
                ></Image>
                <View className='bottom-group_1 flex-col'>
                  <View className='justify-between group_4'>
                    <Text className='image_20'>姓名：</Text>
                    <Text className='image_21'>{item.buyer_name}</Text>
                  </View>
                  <View className='justify-between group_4'>
                    <Text className='image_20'>联系方式：</Text>
                    <Text className='image_21'>{item.member_mobile}</Text>
                  </View>
                  <View className='justify-between group_4'>
                    <Text className='image_20 orange'>提成金额：</Text>
                    <Text className='image_21 orange'>{'￥' + item.tcje}</Text>
                  </View>
                  <View className='justify-between group_4'>
                    <Text className='image_20'>下单时间：</Text>
                    <Text className='image_21'>{item.addtime}</Text>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export default _C

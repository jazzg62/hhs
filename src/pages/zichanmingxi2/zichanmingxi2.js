import { View, Image, Text } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './zichanmingxi2.scss'

@withWeapp({
  data: {
    menuButtonBoundingClientRect: Taro.getMenuButtonBoundingClientRect(),
    zsy: '0.00',
    yjs: '0.00',
    wjs: '0.00',
    list: []
  },
  onLoad(options) {
    let { zsy, wjs, yjs } = options
    this.setData({
      zsy,
      yjs,
      wjs
    })
    this.request_order_list()
  },
  navigate_back() {
    Taro.navigateBack({
      delta: 0
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
    const { menuButtonBoundingClientRect, zsy, yjs, wjs, list } = this.data
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
          <View className='flex-col section_2'>
            <View className='justify-between group_1'>
              <View className='flex-col'>
                <Text className='image'>总收入金额（元）</Text>
                <Text className='image_1'>{zsy}</Text>
                {/*  <image src="/res/local/c105d3a0659cd51126123c9f59fa124e.png" class="image" />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             <image src="/res/local/fa4a0da021632997c81b4f8723214cc5.png" class="image_1" /> */}
              </View>
              <View className='flex-row section_3'>
                <Image
                  src={require('../../res/local/aa51fd56d05a15c7c80dd7f2dc433903.png')}
                  className='image_2'
                ></Image>
                <Image
                  src={require('../../res/local/5ecbb4d76cceda92e515dfead7f8c787.png')}
                  className='image_3'
                ></Image>
              </View>
            </View>
            <Image
              src={require('../../res/local/5c2889f9b00eb08fe1f6dd3360d8c4b0.png')}
              className='image_4'
            ></Image>
            <View className='flex-row equal-division'>
              <View className='flex-col equal-division-item'>
                <Text className='image_8'>已结算（元）</Text>
                <Text className='image_6'>{yjs}</Text>
              </View>
              <Image
                src={require('../../res/local/1b6cd7fba5cf82d72cd33bf1ee98a6e6.png')}
                className='horiz-divider'
              ></Image>
              <View className='flex-col equal-division-item_1'>
                <Text className='image_8'>待结算（元）</Text>
                <Text className='image_6'>{wjs}</Text>
              </View>
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

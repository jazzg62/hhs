import { View, Image, Text, ScrollView } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './zichanmingxi2.scss'

@withWeapp({
  data: {
    menuButtonBoundingClientRect: Taro.getMenuButtonBoundingClientRect(),
    zsy: '0.00',
    zhye: '0.00',
    list: [],
    isloading: true,
    hasmore: false,
    request: {
      curpage: 1,
      page: Taro.getApp().globalData.page,
      key: Taro.getApp().globalData.key,
    },
  },
  onLoad(options) {
    let { zsy, zhye} = options
    let key = Taro.getApp().globalData.key;
    let page = Taro.getApp().globalData.page;
    this.setData({zsy,zhye,list:[], request: { ...this.data.request, key: key, page } })
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
    Taro.request({
      url: 'https://www.cnql888.com/mobile/index.php?act=member_tk&op=sy_list',
      data: this.data.request,
      success: res => {
        let list1 = this.data.list
        list1.push(...res.data.datas.list)
        this.setData({
          hasmore:res.data.hasmore,
          isloading:false,
          list: list1,
        })
      }
    })
  },
  load_more_list(){
    console.log('load_more', this.data);
    if (this.data.isloading || !this.data.hasmore) {
      return
    }
    let { request } = this.data
    this.setData({
      isloading: true,
      request: {
        ...request,
        curpage: request.curpage + 1
      }
    })
    this.request_order_list()
  }
})
class _C extends React.Component {
  render() {
    const { menuButtonBoundingClientRect, zsy, zhye, list, isloading, hasmore } = this.data
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
              <Text className='balance-price'>{zsy}</Text>
            </View>
            <View className='balance-column'>
              <Text className='balance-des'>可提现</Text>
              <View className='balance-price'>{zhye} <Text className='balance-withdraw' onClick={this.navigate_withdraw}>提现</Text></View>
            </View>
          </View>
        </View>
        <ScrollView className='flex-col list' onScrollToLower={this.load_more_list}
          scrollY
          enableFlex
        >
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
          {(isloading || hasmore) && (
              <View className='more'>
                <View className='spinner'>
                  <View className='spinner-item'></View>
                </View>
                <Text className='more-text'>数据加载中</Text>
              </View>
            )}
        </ScrollView>
      </View>
    )
  }
}

export default _C

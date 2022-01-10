import {
  View,
  Image,
  Text,
  Form,
  Input,
  ScrollView,
  Picker
} from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './shouye.scss'

@withWeapp({
  data: {
    menuButtonBoundingClientRect: Taro.getMenuButtonBoundingClientRect(),
    list: [],
    latitude: '',
    longitude: '',
    isloading: false,
    hasmore: false,
    request: {
      curpage: 1,
      page: Taro.getApp().globalData.page,
      key: Taro.getApp().globalData.key,
      city: '加载中...',
      goods_name:'',
    },
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onLoad(options) {
    let { key } = options
    if(key){
      Taro.getApp().globalData['key'] = key
      this.setData({ request: { ...this.data.request, key: key } })
    }else{
      key = Taro.getApp().globalData.key
    }
    this.setData({list:[]})
    this.get_location()
    this.getMember_id(key)
  },
  onPullDownRefresh() {
    console.log('onPullDownRefresh')
    this.setData({list:[]})
    this.request_home_list();
  },
  getMember_id(key) {
    Taro.request({
      url:
        'https://www.cnql888.com/mobile/index.php?act=member_tk&op=member_xx',
      data: {
        key: key
      },
      success: res => {
        Taro.getApp().globalData['member_id'] = res.data.datas.member_id
      }
    })
  },
  request_home_list() {
    Taro.request({
      type: 'get',
      url: 'https://www.cnql888.com/mobile/index.php?act=tk_index&op=tk_goods',
      data: this.data.request,
      success: res => {
        // console.log(res);
        let list1 = this.data.list
        list1.push(...res.data.datas.list)
        this.setData({
          hasmore: res.data.hasmore,
          isloading: false,
          list: list1
        })
        wx.stopPullDownRefresh();
      }
    })
  },
  load_more_list() {
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
    this.request_home_list()
  },
  navigate_xiangqing(e) {
    console.log(e)
    let { id } = e.currentTarget.dataset
    Taro.navigateTo({
      url: '/pages/shangpinxiangqing1/shangpinxiangqing1?id=' + id
    })
  },
  onChange(e){
    console.log(e);
    this.setData({
      isloading: true,
      hasmore: true,
      list:[],
      request:{
        curpage: 1,
        page: Taro.getApp().globalData.page,
        key: Taro.getApp().globalData.key,
        city:e.detail.value[2]
      }
    });
    this.request_home_list();
  },
  goods_search(e){
    console.log(e);
    this.setData({
      isloading: true,
      hasmore: true,
      list:[],
      request:{
        curpage: 1,
        page: Taro.getApp().globalData.page,
        key: Taro.getApp().globalData.key,
        city:this.data.request.city,
        goods_name:e.detail.value
      }
    });
    this.request_home_list();
  },
  get_location() {
    let app = Taro.getApp()
    // console.log('globalData',app.globalData);
    // 获取当前定位
    Taro.getLocation({
      type: 'gcj02',
      success: res => {
        console.log('当前定位：', res)
        app.globalData['latitude'] = res.latitude
        app.globalData['longitude'] = res.longitude
        // 获取具体定位信息
        Taro.request({
          type: 'get',
          dataType: 'json',
          data: {
            location: res.latitude + ',' + res.longitude, //获取到的当前经纬度信息
            key: 'LRHBZ-4RZLU-Q55VZ-BQND3-SR5Q7-OYBBN', // 填申请到的key
            get_poi: 0, //具体的地址
            output: 'json' //返回格式：支持JSON/JSONP，默认JSON
          },
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?',
          success: res1 => {
            // console.log(res);
            res1 = res1.data.result
            // let global_city = app.globalData.city
            let res_city = res1.address_component.district
            // if(global_city != '' && res_city != '' && global_city!=res_city && !confirm('当前定位城市为'+res_city+'，是否切换')){
            //     //增加拒绝有效期,不改变时间
            //     wx.setStorage({key:'last_update_time', data:+new Date()});
            //     return ;
            // }
            this.setData({ request: { ...this.data.request, city: res_city } })
            this.request_home_list()
          }
        })
      }
    })
  }
})
class _C extends React.Component {
  render() {
    const {
      menuButtonBoundingClientRect,
      request,
      list,
      isloading,
      hasmore
    } = this.data
    return (
      <View className='flex-col page'>
        <View className='flex-col group'>
          <View className='flex-col section_1'>
            <View
              className='justify-center search'
              style={
                'margin-top:' +
                menuButtonBoundingClientRect.top +
                'px;height: ' +
                menuButtonBoundingClientRect.height +
                'px;'
              }
            >
              <Image
                src={require('../../res/local/ad1a518ae83836dca05ab80b1bb65a7c.png')}
                className='icon'
              ></Image>
              {/* <Text decode='decode' className='text'>
                {request.city}
              </Text> */}
              <Picker mode='region' value='' onChange={this.onChange}>
                <Text decode='decode' className='text'>
                  {request.city}
                </Text>
              </Picker>
              <Form className='flex-row search_1'>
                <Image
                  src={require('../../res/local/abe71ad0d801c96c42cdc297d0dcb467.png')}
                  className='icon_1'
                ></Image>
                <Input
                  decode='decode'
                  className='text_1'
                  type='text'
                  placeholder='请输入商品关键字'
                  value={this.data.request.goods_name}
                  onConfirm={this.goods_search}
                  confirm-type='search'
                ></Input>
              </Form>
              <View className='flex-row section_2'></View>
            </View>
          </View>
          <ScrollView
            className='flex-col list'
            onScrollToLower={this.load_more_list}
            scrollY
          >
            {list.map((item) => {
              return (
                <View
                  className='list-item flex-col'
                  key='index'
                  onClick={this.navigate_xiangqing}
                  data-id={item.id}
                ><Image
                  src={item.goods_pic}
                  className='image_4'
                  lazyLoad
                  mode='scaleToFill'
                ></Image>
                  <View className='group_1 flex-col'>
                    <Text decode='decode' className='text_2'>
                      {item.goods_name}
                    </Text>
                    <Text decode='decode' className='text_4'>
                      {item.goods_des}
                    </Text>
                  </View>
                  <View className='group_2 flex-row'>
                    <View className='left-text-wrapper flex-col items-center'>
                      <Text decode='decode'>限时直降</Text>
                    </View>
                    <View className='right-text-wrapper flex-col'>
                      <Text decode='decode' className='text_7'>
                        分享也赚钱
                      </Text>
                    </View>
                  </View>
                  <View className='group_3 justify-between'>
                    <View className='flex-row'>
                      <View className='left-group'>
                        <Text decode='decode' className='text_9'>
                          ￥
                        </Text>
                        <Text decode='decode' className='text_11'>
                          {item.price}
                        </Text>
                      </View>
                      <View className='right-group'>
                        <Text decode='decode' className='text_13'>
                        </Text>
                        <Text decode='decode' className='text_15'>
                        原价{item.market_price}
                        </Text>
                      </View>
                    </View>
                    {/* <Text decode='decode' className='text_17'>
                      已售：562 | 好评：100%
                    </Text> */}
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
      </View>
    )
  }
}

export default _C

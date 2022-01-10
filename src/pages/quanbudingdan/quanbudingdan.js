import { View, Text, Image, ScrollView } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './quanbudingdan.scss'

@withWeapp({
  data: {
    icon_ml: '25rpx',
    list: [],
    isloading: true,
    hasmore: false,
    request: {
      curpage: 1,
      key: '',
      page: '',
      lx: 'all'
    }
  },
  onLoad(options) {
    let icon_ml = '25px'
    let { request } = this.data
    let lx = 'all'
    if (options.lx) {
      lx = options.lx
      const ml_left = {
        all: '25rpx',
        '1': '221rpx',
        '2': '403rpx',
        '3': '583rpx'
      }
      icon_ml = ml_left[lx]
    }
    console.log(this.data)
    this.setData({
      icon_ml: icon_ml,
      list:[],
      request: {
        ...request,
        lx: lx,
        key: Taro.getApp().globalData.key,
        page: Taro.getApp().globalData.page
      }
    })
    this.request_order_list()
  },
  request_order_list() {
    Taro.request({
      url:
        'https://www.cnql888.com/mobile/index.php?act=member_tk&op=tk_orders',
      data: this.data.request,
      success: res => {
        console.log(res)
        let { list } = res.data.datas
        for (let i in list) {
          list[i]['zts'] = this.translate_message(list[i]['zt'])
        }
        console.log(list)
        let list1 = this.data.list
        list1.push(...list)
        this.setData({
          list: list1,
          isloading: false,
          hasmore: res.data.hasmore
        })
      }
    })
  },
  load_more_list() {
    if (this.data.isloading || !this.data.hasmore) return
    let { request } = this.data
    this.setData({
      isloading: true,
      request: {
        ...request,
        curpage: request.curpage + 1
      }
    })
    this.request_order_list()
  },
  translate_message(zt) {
    if (zt == '0') return '取消订单'
    else if (zt == '1') return '待付款'
    else if (zt == '2') return '待核销'
    else if (zt == '3') return '已完成'
    return '未知'
  },
  switch_tab(event) {
    // margin-left
    // 25rpx  221rpx  403rpx  583rpx
    let { idx, lx } = event.currentTarget.dataset
    const ml_left = ['25rpx', '221rpx', '403rpx', '583rpx']
    let { request } = this.data
    this.setData({
      icon_ml: ml_left[idx],
      isloading: true,
      list: [],
      request: {
        ...request,
        lx: lx,
        curpage: 1
      }
    })
    this.request_order_list()
  },
  navigate_xiangqing(e) {
    console.log(e)
    let { id } = e.currentTarget.dataset
    Taro.navigateTo({
      url: '/pages/shangpinxiangqing1/shangpinxiangqing1?id=' + id
    })
  },
  navigate_quanma(e) {
    let { idx } = e.currentTarget.dataset
    let item = this.data.list[idx]
    console.log(item, idx)
    Taro.navigateTo({
      url:
        '/pages/chakanquanma2/chakanquanma2?ddh=' +
        item.ddh +
        '&goods_name=' +
        item.goods_name +
        '&goods_pic=' +
        item.goods_pic +
        '&goods_price=' +
        item.pay_money +
        '&goods_des=' +
        item.goods_des +
        '&end_time=' +
        item.end_time +
        '&store_name=' +
        item.store_name +
        '&store_avatar=' +
        item.store_avatar +
        '&store_address=' +
        item.store_address +
        '&store_phone=' +
        item.seller_name +
        '&latitude=' +
        item.store_wd +
        '&longitude=' +
        item.store_jd
    })
  },
  buy(e){
    let {ddh} = e.currentTarget.dataset;
    Taro.showLoading({
      title: '加载中',
      mask: true
    })
    Taro.request({
      url:
        'https://www.cnql888.com/mobile/index.php?act=member_tkpay&op=pay',
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        key: Taro.getApp().globalData['key'],
        ddh:ddh
      },
      success: res => {
        console.log(res)
        Taro.hideLoading();
        let { result } = res.data.datas
        Taro.requestPayment({
          timeStamp: result.timeStamp,
          nonceStr: result.nonceStr,
          package: result.package,
          signType: 'RSA',
          paySign: result.paySign,
          success: () => {
            Taro.showToast({
              title: '支付成功'
            })
            this.setData({
              lx:2
            })
          }
        })
      }
    })
  },
  buy_again(e){
    Taro.login({
      success: res => {
        let {goods_id, inviter_id:tjr_id} = e.currentTarget.dataset;
        Taro.showLoading({
          title: '加载中',
          mask: true
        })
        Taro.request({
          url:
            'https://www.cnql888.com/mobile/index.php?act=member_tkpay&op=pay',
          method: 'post',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: {
            key: Taro.getApp().globalData['key'],
            id:goods_id,
            tjr_id:tjr_id,
            code:res.code
          },
          success: res1 => {
            console.log(res1)
            Taro.hideLoading();
            if(res1.data.datas.error){
              Taro.showModal({
                title: '提示',
                content: res1.data.datas.error,
                showCancel: false
              });
              return ;
            }
            let { result } = res1.data.datas
            Taro.requestPayment({
              timeStamp: result.timeStamp,
              nonceStr: result.nonceStr,
              package: result.package,
              signType: 'RSA',
              paySign: result.paySign,
              success: () => {
                Taro.showToast({
                  title: '支付成功'
                })
                this.setData({
                  lx:2
                })
              }
            })
          }
        })
      }})
  }
})
class _C extends React.Component {
  render() {
    const { request, icon_ml, list, isloading, hasmore } = this.data
    return (
      <View className='flex-col page'>
        <View className='flex-col group_2'>
          <View className='flex-col section_2'>
            <View className='justify-between'>
              <Text
                decode='decode'
                className={'text_' + (request.lx == 'all' ? 1 : 2)}
                onClick={this.switch_tab}
                data-idx='0'
                data-lx='all'
              >
                全部订单
              </Text>
              <Text
                decode='decode'
                className={'text_' + (request.lx == '1' ? 1 : 2)}
                onClick={this.switch_tab}
                data-idx='1'
                data-lx='1'
              >
                待支付
              </Text>
              <Text
                decode='decode'
                className={'text_' + (request.lx == '2' ? 1 : 2)}
                onClick={this.switch_tab}
                data-idx='2'
                data-lx='2'
              >
                未使用
              </Text>
              <Text
                decode='decode'
                className={'text_' + (request.lx == '3' ? 1 : 2)}
                onClick={this.switch_tab}
                data-idx='3'
                data-lx='3'
              >
                已使用
              </Text>
            </View>
            <Image
              src={require('../../res/local/180df00b4c06e4b4c72f85be250e73ab.png')}
              className='icon_1'
              style={'margin-left:' + icon_ml + ';'}
            ></Image>
          </View>
          <ScrollView
            className='flex-col list'
            onScrollToLower={this.load_more_list}
            scrollY
          >
            {list.map((item, index) => {
              return (
                <View className='list-item flex-col' key='id'>
                  <View className='justify-between'>
                    <View className='left-group flex-row'>
                      <Image
                        src={item.store_avatar}
                        className='image_4'
                      ></Image>
                      <Text decode='decode' className='text_5'>
                        {item.store_name}
                      </Text>
                    </View>
                    <Text decode='decode' className='text_7'>
                      {item.zts}
                    </Text>
                  </View>
                  <View className='bottom-group flex-row'>
                    <Image
                      src={item.goods_pic}
                      className='image_6'
                      lazyLoad
                      data-id={item.goods_id}
                      onClick={this.navigate_xiangqing}
                    ></Image>
                    <View className='center-group flex-col'>
                      <Text decode='decode' className='text_14'>
                        {item.goods_name}
                      </Text>
                      <Text decode='decode' className='text_15'>
                        {item.goods_des}
                      </Text>
                    </View>
                    <View className='right-group flex-col'>
                      <View className='flex-col items-end'>
                        <View className='top-group'>
                          <Text decode='decode' className='text_9'>
                            ￥
                          </Text>
                          <Text decode='decode' className='text_11'>
                            {item.pay_money}
                          </Text>
                        </View>
                        <Text decode='decode' className='text_13'>
                          共1件
                        </Text>
                      </View>
                      <View className='bottom-text-wrapper flex-col items-center'>
                        {item.zt == 1 && <Text decode='decode' onClick={this.buy} data-ddh={item.ddh}>现在付款</Text>}
                        {item.zt == 2 && (
                          <Text
                            decode='decode'
                            onClick={this.navigate_quanma}
                            data-idx={index}
                          >
                            去核销
                          </Text>
                        )}
                        {item.zt == 3 && <Text decode='decode' onClick={this.buy_again} data-inviter_id={item.inviter_id} data-goods_id>再来一单</Text>}
                        {item.zt == 0 && <Text decode='decode'>已取消</Text>}
                      </View>
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
      </View>
    )
  }
}

export default _C

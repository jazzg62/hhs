import { Block, View, Image, Text, Canvas, Map } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import barcode from '../../common/bar.js'
import drawQrcode from '../../common/qrcode.js'
import './chakanquanma2.scss'

@withWeapp({
  data: {
    ddh: '',
    goods_name: '',
    goods_pic: '',
    goods_price: '',
    goods_des: '',
    end_time: '',
    store_name: '',
    store_avatar: '',
    store_address: '',
    store_phone: '',
    latitude: 0,
    longitude: 0,
    show_ddh: false,
    markers: [
      {
        id: 1,
        latitude: 0,
        longitude: 0,
        name: '火星'
      }
    ]
  },
  onLoad(options) {
    let {
      ddh,
      goods_name,
      goods_pic,
      goods_price,
      goods_des,
      end_time,
      store_name,
      store_avatar,
      store_address,
      store_phone,
      latitude,
      longitude
    } = options
    console.log(options)
    this.setData({
      ddh,
      goods_name,
      goods_pic,
      goods_price,
      goods_des,
      end_time,
      store_name,
      store_avatar,
      store_address,
      store_phone,
      latitude: Number(latitude),
      longitude: Number(longitude),
      markers: [
        {
          id: 1,
          latitude: Number(latitude),
          longitude: Number(longitude),
          name: store_name
        }
      ]
    })
    barcode.code128(
      Taro.createCanvasContext('barcode'),
      ddh,
      '625rpx',
      '100rpx'
    )
    drawQrcode({
      width: 150,
      height: 150,
      canvasId: 'qrcode',
      text: 'https://www.cnql888.com/wap/gyl/page/ylhx/hx.html?ddh=' + ddh
    })
  },
  navigate_back() {
    Taro.navigateBack({
      delta: 0
    })
  },
  make_phonecall() {
    Taro.makePhoneCall({ phoneNumber: this.data.store_phone })
  },
  show_ddh() {
    this.setData({
      show_ddh: !this.data.show_ddh
    })
  },
  open_location() {
    Taro.openLocation({
      latitude: Number(this.data.latitude),
      longitude: Number(this.data.longitude),
      scale: 18
    })
  }
})
class _C extends React.Component {
  render() {
    const {
      store_avatar,
      store_name,
      goods_pic,
      goods_des,
      goods_price,
      end_time,
      ddh,
      show_ddh,
      store_address,
      latitude,
      longitude,
      markers
    } = this.data
    return (
      <View className='flex-col page'>
        <View className='flex-col section_1'>
          <Image
            src={require('../../res/local/feadbac5b37119c9f99281a24bdf6d3b.png')}
            className='icon'
            onClick={this.navigate_back}
          ></Image>
          <Text className='image'>待核销</Text>
        </View>
        <View className='flex-col group'>
          <View className='flex-col section_2'>
            <View className='top-group flex-row view'>
              <Image src={store_avatar} className='image_1'></Image>
              <Text decode='decode' className='text'>
                {store_name}
              </Text>
            </View>
            <View className='top-group flex-row view_1'>
              <Image src={goods_pic} className='image_2'></Image>
              <View className='flex-col group_1'>
                <Text decode='decode' className='text_1'>
                  {goods_des}
                </Text>
              </View>
              <View className='group_2'>
                <Text decode='decode' className='text_3'>
                  ￥
                </Text>
                <Text decode='decode' className='text_4'>
                  {goods_price}
                </Text>
              </View>
            </View>
            <View className='flex-col group_3'>
              <View className='justify-between group_4'>
                <Text className='image_3'>未使用1份</Text>
                {end_time != '' ? (
                  <Text className='image_4'>{end_time + '前有效'}</Text>
                ) : (
                  <Text className='image_4'>有效期以商品说明为准</Text>
                )}
              </View>
              <View className='flex-col group_5'>
                <Image
                  src={require('../../res/local/294c916eb36d59791b2f2caa38a9781c.png')}
                  className='image_5 image_6'
                ></Image>
                <Canvas
                  className='flex-col image-wrapper'
                  canvasId='barcode'
                  forceUseOldCanvas='true'
                ></Canvas>
                {/*  <image src="/res/local/187fed1ab54844a8ea147440872c5bfa.png" class="image_7" /> */}
                {show_ddh ? (
                  <Text
                    className='image_7'
                    onClick={this.show_ddh}
                  >
                    {ddh + ' 隐藏核销码'}
                  </Text>
                ) : (
                  <Text
                    className='image_7'
                    onClick={this.show_ddh}
                  >
                    ******** 查看核销码
                  </Text>
                )}
                <Canvas
                  className='image_8'
                  canvasId='qrcode'
                  forceUseOldCanvas='true'
                  style='width: 150px; height: 150px;'
                ></Canvas>
                <Image
                  src={require('../../res/local/294c916eb36d59791b2f2caa38a9781c.png')}
                  className='image_5 image_9'
                ></Image>
                <View className='flex-row group_7' style='align-items: center;'>
                  <Image
                    src={require('../../res/local/fd1139f10493da612e3acba3d76874df.png')}
                    className='image_10'
                  ></Image>
                  {/*  <image src="/res/local/550136ac7c9693db1b8708f45a7ada44.png" class="image_11" /> */}
                  <Text className='image_11'>
                    请先与收银员确认商品不会额外支付费用
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className='flex-col section_3'>
            <Text className='image_12'>适用门店</Text>
            <View className='justify-between group_8'>
              <View className='flex-col'>
                <Text className='image_13'>{store_name}</Text>
                <Text className='image_14' onClick={this.open_location}>{store_address}</Text>
              </View>
              <Image
                src={require('../../res/local/acb5e6ba3abc9f12c6debfe824e976fc.png')}
                className='icon_1'
                onClick={this.make_phonecall}
              ></Image>
            </View>
            <Map
              id='store_map'
              latitude={latitude}
              longitude={longitude}
              markers={markers}
              style='width: 620rpx;height: 250rpx;margin-top:20rpx'
            ></Map>
          </View>
        </View>
      </View>
    )
  }
}

export default _C

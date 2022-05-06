import {
  ScrollView,
  View,
  Image,
  Swiper,
  SwiperItem,
  Text,
  Button
} from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './shangpinxiangqing1.scss'
// import DangeHtml from '../../components/DangeHtml'
// import WxParse from '../../components/wxParse/wxParse'
// import '../../components/wxParse/wxParse.wxss'
// import '../../components/wxParse/wxParse.wxml'

@withWeapp({
  data: {
    menuButtonBoundingClientRect: Taro.getMenuButtonBoundingClientRect(),
    goods_info: {
      pic: [],
      sale_list:[]
    },
    time_to_end: '',
    interval: 0,
    isSave:false,
    imagePath: '',
    image:'',
    template:{},
    goods_details:'',
    is_show_popup:false,
    ly:'',
    tjr_id:''
  },
  onLoad(options) {
    console.log(options)
    if (options.tjr_id)
      this.setData({
        tjr_id: options.tjr_id
      })

    if(options.member_id){
      Taro.getApp().globalData['member_id'] = options.member_id;
      Taro.getApp().globalData['key'] = options.key;
      if(options.ly){
        this.setData({
          ly:options.ly
        })
      }
    }
    this.request_goods_detail(options.id)
  },
  onUnload(){
    clearInterval(this.data.interval);
  },
  saveImage(){
    if (this.imagePath && typeof this.imagePath === 'string') {
      this.isSave = false;
      wx.saveImageToPhotosAlbum({
        filePath: this.imagePath,
      });
    }
  },
  onShareAppMessage() {
    if(this.data.goods_info.goods_xckh){
      return {
        title: this.data.goods_info.goods_xckh,
        path:
          '/pages/index/index?src=' +encodeURIComponent('https://www.cnql888.com/wap/welcome/yltk.html?id='+this.data.goods_info.id+'&tjr_id='+Taro.getApp().globalData.member_id),
        imageUrl: this.data.goods_info.pic[0]
      };
    }

    return {
      title: Number(this.data.goods_info.price)+'元抢'+this.data.goods_info.goods_name,
      path:
        '/pages/index/index?src=' +encodeURIComponent('https://www.cnql888.com/wap/welcome/yltk.html?id='+this.data.goods_info.id+'&tjr_id='+Taro.getApp().globalData.member_id),
      imageUrl: this.data.goods_info.pic[0]
    }
  },
  navigate_back() {
    if(this.data.ly == 'h5'){
      Taro.navigateBack({
        delta: 0
      });
      return ;
    }
    wx.switchTab({url:'/pages/shouye/shouye'})
  },
  request_goods_detail(id) {
    Taro.request({
      url:
        'https://www.cnql888.com/mobile/index.php?act=tk_index&op=goods_details',
      data: {
        id,
        key:Taro.getApp().globalData.key
      },
      success: res => {
        console.log(res)
        let goods_info = res.data.datas.goods_info
        let interval = 0
        let list = [];
        for(let i in goods_info['pic']){
          if(!goods_info['pic'][i].endsWith('/')){
            list.push(goods_info['pic'][i]);
          }
        }
        goods_info['pic'] = list;
        if (goods_info.end_date) {
          let end = +new Date(goods_info.end_date)
          interval = setInterval(
            function() {
              let now = +new Date()
              let temp = (end - now) / 1000
              // console.log(temp, now, end)
              if (temp <= 0) {
                clearInterval(this.data.interval)
                this.setData({
                  time_to_end: '已结束'
                });
                return
              }
              let res1 = ''
              let  day, hour, minute, second
              day = parseInt(temp / (60 * 60 * 24))
              if (day >= 1) res1 += day + '天 '
              temp = temp - day * 60 * 60 * 24
              hour = parseInt(temp / (60 * 60))
              if (hour <= 0) res1 += '0小时 '
              else  res1 += hour + '小时 '
              temp = temp - hour * 60 * 60
              minute = parseInt(temp / 60)
              if (minute <= 0) res1 += '0分 '
              else res1 += minute + '分 '
              temp = temp - minute * 60
              second = parseInt(temp)
              if (second <= 0) res1 += '0'
              else res1 += second
              res1+='秒';
              this.setData({
                time_to_end: res1
              })
            }.bind(this),
            1000
          )
        }
        // let article = goods_info.goods_details;
        // let that = this;
        // WxParse.wxParse('article', 'html', article, that, 0);

        this.setData({
          goods_info,
          interval: interval,
          template: this.goods_share_pic({
            store_name:goods_info.store_name,
            goods_id:goods_info.id,
            goods_name:goods_info.goods_name,
            goods_pic:goods_info.pic[0],
            goods_des:goods_info.goods_des,
            goods_end_time:goods_info.end_date,
            store_address:goods_info.store_address,
            goods_price:goods_info.price,
            goods_market_price:goods_info.market_price,
            tjr_id:Taro.getApp().globalData.member_id,
            member_avatar:goods_info.member_avatar,
            member_name:goods_info.member_name,
          }),
          goods_details:goods_info.goods_details,
        })
      }
    })
  },
  make_phonecall() {
    Taro.makePhoneCall({ phoneNumber: this.data.goods_info.seller_name })
  },
  goods_share_pic(data) {
    let {store_name, goods_name, goods_des, store_address, member_name} = data;
    let {getLengthCN, getSubstrCN} = this;
    if(goods_des == '') goods_des = goods_name;
    goods_des = goods_des.replace("\n", "");
    store_address = '商家地址：'+store_address;
      return ({
          width: '750px',
          height: '1189px',
          background: '#f7f7f7',
          views: [{
                  id: 'goods_pic',
                  type: 'image',
                  url: data.goods_pic,
                  css: {
                      top: `12.5px`,
                      left: `12.5px`,
                      width: '725px',
                      height: '725px',
                      borderRadius: '8px',
                      scalable: false,
                  },
              },
              {
                  type: 'rect',
                  id: 'bg_rect',
                  css: {
                      width: '725px',
                      height: '425px',
                      top: '750px',
                      left: '12.5px',
                      borderRadius: '8px',
                      color: '#ffffff'
                  }
              },
              {
                  type: 'text',
                  text:getLengthCN(store_name)<=34?store_name:getSubstrCN(store_name, 0, 31)+'...',
                  css: {
                      maxWidth: '430px',
                      top: '783px',
                      left: '25px',
                      color: '#999999',
                      fontSize: '25px',
                  },
              },
              {
                  type: 'text',
                  text: getLengthCN(goods_name)<=24?goods_name:getSubstrCN(goods_name, 0, 21) + '...',
                  css: {
                      width: '430px',
                      top: '825px',
                      left: '25px',
                      color: '#000000',
                      fontSize: '35px',
                  },
              },
              {
                  type: 'text',
                  text: getLengthCN(goods_des)<=68?goods_des:getSubstrCN(goods_des, 0, 65)+'...',
                  css: {
                      width: '430px',
                      top: '882px',
                      left: '25px',
                      color: '#999999',
                      fontSize: '25px',
                      lineHeight: '42px'
                  },
              },
              {
                  type: 'text',
                  text: '截至日期：'+data.goods_end_time,
                  css: {
                      width: '430px',
                      top: '968px',
                      left: '25px',
                      color: '#333333',
                      fontSize: '25px',
                      lineHeight: '42px'
                  },
              },
              {
                  type: 'text',
                  text: getLengthCN(store_address)<=64?store_address:getSubstrCN(store_address, 0, 61)+'...',
                  css: {
                      width: '430px',
                      top: '1010px',
                      left: '25px',
                      color: '#333333',
                      fontSize: '25px',
                      lineHeight: '42px'
                  },
              },
              {
                  type: 'text',
                  text: '￥',
                  css: {
                      top: '1122px',
                      left: '25px',
                      color: '#FE3C3C',
                      fontSize: '25px',
                  },
              },
              {
                  type: 'text',
                  text: data.goods_price,
                  css: {
                      top: '1103px',
                      left: '54px',
                      color: '#FE3C3C',
                      fontSize: '44px',
                  },
              },
              {
                  type: 'text',
                  text: '￥'+data.goods_market_price,
                  css: {
                      top: '1122px',
                      left: '195px',
                      color: '#AEAEAE',
                      fontSize: '25px',
                      textDecoration: 'line-through'
                  },
              },
              {
                  type: 'qrcode',
                  content: 'https://www.cnql888.com/wap/welcome/yltk.html?id='+data.goods_id+'&tjr_id='+data.tjr_id,
                  css: {
                      top: '787px',
                      left: '484px',
                      color: '#000000',
                      width: '227px',
                      height: '227px',
                  },
              },
              {
                type: 'text',
                text: '可长按或者扫描购买',
                css: {
                    top: '1082px',
                    left: '485px',
                    color: '#AEAEAE',
                    fontSize: '25px',
                },
            },
            {
                id: 'member_avatar',
                type: 'image',
                url: data.member_avatar.replace("http://", "https://"),
                css: {
                    top: `1035px`,
                    left: `520px`,
                    width: '40px',
                    height: '40px',
                    borderRadius: '20px',
                },
            },
            {
                type: 'text',
                text: getLengthCN(member_name)<=14?member_name:getSubstrCN(member_name, 0, 11) + '...',
                css: {
                    maxWidth: '50px',
                    top: '1038px',
                    left: '570px',
                    color: '#999999',
                    fontSize: '25px',
                },
            },
          ]
      })
  },
  getLengthCN(str){
    return str.replace(/[\u0391-\uFFE5]/g,"aa").length
  },
  getSubstrCN(str, s, e){
    let total = e-s;
    let list = str.split('');
    let res = [];
    for(let i in list){
        if(total<=0) break;
        res.push(list[i]);
        total-= /[\u0391-\uFFE5]/.test(list[i]) ? 2 : 1;
    }
    return res.join('');
  },
  ImgOK(e){
    console.log('img ok:',e);
    let path = e.detail.path;
    this.setData({
      image: path,
      imagePath: path,
    });
    if (this.data.isSave) {
      this.saveImage(this.data.imagePath);
    }
  },
  download_share_img(){
    console.log('download_share_img');
    console.log(this.data.imagePath );
    if (this.data.imagePath && typeof this.data.imagePath === 'string') {
      this.data.isSave = false;
      wx.saveImageToPhotosAlbum({
        filePath: this.data.imagePath,
        success: () => {
          Taro.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1000
          })
        }
      });
    }
  },
  show_popup(){
    this.setData({
      is_show_popup:true
    })
  },
  hide_popup(){
    this.setData({
      is_show_popup:false
    })
  },
  open_location() {
    Taro.openLocation({
      latitude: Number(this.data.goods_info.store_wd),
      longitude: Number(this.data.goods_info.store_jd),
      scale: 18
    })
  },
  get_distance(lat1, lng1, lat2, lng2) {
    let radLat1 = (lat1 * Math.PI) / 180.0
    let radLat2 = (lat2 * Math.PI) / 180.0
    let a = radLat1 - radLat2
    let b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
    let s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
        )
      )
    s = s * 6378.137 // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000
    return s
  },
  buy() {
    let {goods_lx, id} = this.data.goods_info;
    if(goods_lx == 1){
      let url = 'https://www.cnql888.com/wap/tmpl/order/buy_step1_yltk.html?goods_id='+id+'&buynum=1&key='+Taro.getApp().globalData['key']+'&tjr_id='+this.data.tjr_id;
      wx.navigateTo({
        url: '/pages/index/index?src=' + encodeURIComponent(url)
      })
      return ;
    }
    Taro.showLoading({
      title: "发起支付中...",
      mask:true
    });
    Taro.login({
      success: res => {
        Taro.request({
          url:
            'https://www.cnql888.com/mobile/index.php?act=member_tkpay&op=pay',
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data: {
            key: Taro.getApp().globalData['key'],
            id: this.data.goods_info.id,
            tjr_id: this.data.tjr_id,
            code: res.code
          },
          success: res1 => {
            Taro.hideLoading();
            console.log(res1)
            if(res1.data.datas.error){
              Taro.showModal({
                title: '提示',
                content: res1.data.datas.error,
                showCancel: false
              })
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
                Taro.navigateTo({
                  url: '/pages/quanbudingdan/quanbudingdan?lx=2'
                })
              }
            })
          }
        })
      }
    })
  }
})
class _C extends React.Component {
  render() {
    const { menuButtonBoundingClientRect, goods_info, time_to_end } = this.data
    return (
      <ScrollView className='flex-col page' scrollY>
        <View className='flex-col group'>
          <View className='flex-col section_1'>
            <Image
              src={require('../../res/local/6ae719245b190f23b0c0980ab8f08453.png')}
              className='image'
              onClick={this.navigate_back}
              style={'top:' + menuButtonBoundingClientRect.top + 'px;'}
            ></Image>
            {/*  <view class="flex-col items-center text-wrapper">
                                                                                                                                                                                                                                                                                                                              <text decode="decode">1/5</text>
                                                                                                                                                                                                                                                                                                                            </view>  */}
            <Swiper
              className='section_1-swiper'
              autoplay
              interval='5000'
              circular
            >
              {goods_info.pic.map((item) => {
                return (
                  <SwiperItem
                    className='section_1-swiper_item'
                    key={item.index}
                  >
                    <Image
                      className='section_1-swiper_item-img'
                      src={item}
                      mode='aspectFit'
                      lazyLoad
                    ></Image>
                  </SwiperItem>
                )
              })}
            </Swiper>
          </View>
          <View className='flex-col section_2'>
            <View className='justify-between group_1'>
              <View className='flex-row items-center align-end'>
                <Text decode='decode' className='text_1'>
                  {/* 限时直降 */}
                </Text>
                <Text decode='decode' className='text_3'>
                    ￥
                  </Text>
                  <Text decode='decode' className='text_4'>
                    {goods_info.price}
                  </Text>
                {/* <Text className='ys'>{goods_info.sale_num}份已售</Text> */}
              </View>
              <Text decode='decode' className='text_2'>
                距离结束
              </Text>
            </View>
            <View className='flex-row align-end'>
                <View className='flex-row section_3'>
                  <Text decode='decode' className='text_6'>
                    原价{goods_info.market_price}
                  </Text>
                </View>
              <Text decode='decode' className='text_7'>
                {time_to_end}
              </Text>
            </View>
          </View>
        </View>
        <View className='group_5'>
          <View className='flex-col section_5'>
            <Text decode='decode' className='text_10'>
              {goods_info.goods_name}
            </Text>
            <View className='flex-row group_7'>
              <Image
                src={require('../../res/local/d5bdad72f9a418028745ba10a6fc01b0.png')}
                className='icon_1'
              ></Image>
              <Text decode='decode' className='text_11'>
                营业时间
              </Text>
              <Text decode='decode' className='text_12'>
                {goods_info.yysj ? goods_info.yysj : '以门店营业时间为准'}
              </Text>
              <Text className='sy'>剩余{goods_info.goods_count}份</Text>
            </View>
            {goods_info.goods_lx == 0 && goods_info.dh_end_date != '' ?<View className='flex-row group_7'>
              <Image
                src={require('../../res/local/end.png')}
                className='icon_1'
              ></Image>
              <Text decode='decode' className='text_11'>
                使用截至时间
              </Text>
              <Text decode='decode' className='text_12'>
                {goods_info.dh_end_date}
              </Text>
            </View>:null}
            <View className='divider'></View>
            <Text decode='decode' className='text_13'>
              {goods_info.goods_des}
            </Text>

              {this.data.imagePath!=''?<Image
                src={require('../../res/local/0b521bd7486185285d48c51202a596a8.png')}
                className='image_1'
                onClick={this.show_popup}
              ></Image>:null}
          </View>
          <View className='section_4 flex-column'>
            <View className='flex-row gmrs'>
              已购买<Text className='orange'>{goods_info.sale_num}</Text>人&nbsp;&nbsp;|&nbsp;&nbsp;<Text className='orange'>{goods_info.goods_click}</Text>次浏览
            </View>
              {goods_info.sale_list.length == 0? null:<Swiper className='buyer_list' vertical autoplay circular interval='2000' >
                {goods_info.sale_list.map((item) => {
                  return (
                  <SwiperItem className='buyer_swiper_item' key={item.index}>
                    <Image className='buyer_avatar' src={item.avatar}></Image>
                    <Text className='buyer_name'>{item.member_name}</Text>
                    <Text className='buyer_addtime'>{item.addtime}</Text>
                  </SwiperItem>
                )
                })
                }
              </Swiper>}
          </View>
          <View className='section_4 flex-row' onClick={this.open_location}>
            <Text decode='decode' className='text_8'>
              可用门店
            </Text>
            <View className='flex-col group_6'>
              <Text decode='decode' className='text_14'>
                {goods_info.store_name}
              </Text>
              <Text decode='decode' className='text_9'>
                {goods_info.store_address}
              </Text>
            </View>
            <Image
              src={require('../../res/local/location.png')}
              className='icon'
              mode='widthFix'
            ></Image>
          </View>
        </View>
        <View className='flex-col group_8'>
          <View className='flex-row section_7'>
            <View
              className='flex-col items-center group_9'
              onClick={this.make_phonecall}
            >
              <Image
                src={require('../../res/local/8870e35b44abab2a9f98e8fc4e0d4490.png')}
                className='image_2'
              ></Image>
              <Text decode='decode' className='text_15'>
                客服
              </Text>
            </View>
            <View className='flex-col group_10'>
              <View className='flex-col items-center button' onClick={this.buy}>
                <Text decode='decode'>立即购买</Text>
              </View>
            </View>
          </View>
        </View>
        <painter
          customStyle='margin-left:40px'
          palette={this.data.template}
          onImgOK={this.ImgOK}
          widthPixels='1000'
        />
        <View className='tabs'>
          <View className='tabs-tab'>
            <Text className='tabs-tab-text'>商品详情</Text>
          </View>
          {/* <View className='tabs-tab'>
            <Text className='tabs-tab-text'>分享图文</Text>
          </View> */}
        </View>
        <View className='wxParse tw'>
          <wxParse html={this.data.goods_details}></wxParse>
        </View>

        <View className={this.data.is_show_popup?'popup popup-show':'popup popup-hide'} onClick={this.hide_popup} >
          <View className='popup-bg' style={'margin-top:' + ( menuButtonBoundingClientRect.top + menuButtonBoundingClientRect.height + 15) +'px'}>
            <Image className='popup-img' mode='widthFix'  src={this.data.imagePath}></Image>
          </View>
          <View className='popup-op'>
            <Button className='popup-save' onClick={this.download_share_img}>
              <Image src={require('../../res/local/download.png')} mode='widthFix'></Image>
              保存到本地
            </Button>
            <Button className='popup-share' openType='share'>
              <Image src={require('../../res/local/share.png')} mode='widthFix'></Image>
              分享此商品
            </Button>
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default _C

/**
 * 支付宝小程序
 */
import Taro from "@tarojs/taro";
import { parse } from "querystring";

export function dealOptions(options) {
  if(!(options && options.path && options.path == 'pages/welcome/welcome')){
    return ;
  }
  let re = /pay\.cnqilian\.com\/dist\/\?/;
  let src = "";
  if (options && options.query && options.query.qrCode) {
    src = decodeURIComponent(options.query.qrCode);
    if (re.test(src)) {
      Taro.reLaunch({
        url:
          "/pages/scan/scan?store_id=" +
          (parse(src)["store_id"] || 0) +
          "&storeb_id=" +
          (parse(src)["storeb_id"] || 0)+
          "&sn="+
          (parse(src)["sn"] || 0)
      });
    } else {
      // 支付宝的扫码应该只支持扫码支付，锁粉类推广码应该在微信中使用
      Taro.showModal({
        content: "请使用微信扫码!",
        showCancel: false
      }).then(() => {
        Taro.reLaunch({
          url: "/pages/index/index"
        });
      });
    }
  }
}

export function alipay_login(){
  Taro.showLoading({
    'title':'登录中，请稍等',
    mask:true
  })
  my.getAuthCode({
    scopes: ['auth_base'],
    success: (res) => {
      if (res.authCode) {
        Taro.request({
          method: "POST",
          url: "https://pay.cnqilian.com/index.php?act=index3&op=index_zfb",
          data: {
            code:res.authCode
          },
          header: {
            "content-type": "application/x-www-form-urlencoded"
          }
        })
        .then((res1)=>{
          Taro.hideLoading();
          let src = 'https://new.cnqilian.com/wap/alipay1/welcome.html?key='+res1.data['key']+'&member_name='+res1.data['member_name']+'&member_id='+res1.data['member_id'];
          my.redirectTo({url:'/pages/index/index?src='+encodeURIComponent(src)})
        })
        .catch(()=>{
          Taro.hideLoading();
          Taro.showModal({
            'title':'提示',
            'content':'登录失败，请稍后再试',
            'showCancel':false,
          })
          .then(()=>{
            my.navigateBack();
          })
        })
      }
    },
  });
}

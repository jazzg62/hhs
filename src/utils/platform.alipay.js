/**
 * 支付宝小程序
 */
import Taro from "@tarojs/taro";
import { parse } from "querystring";

export function dealOptions(options) {
  if(!(options && options.path && options.path == 'pages/welcome/welcome')){
    return ;
  }
  let re = /pay\.cnqilian\.com\/dist\/\?name=store/;
  let src = "";
  if (options && options.query && options.query.qrCode) {
    src = decodeURIComponent(options.query.qrCode);
    if (re.test(src)) {
      Taro.reLaunch({
        url:
          "/pages/scan/scan?store_id=" +
          parse(src)["store_id"] +
          "&storeb_id=" +
          (parse(src)["storeb_id"] || 0)
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

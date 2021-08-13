import Taro from "@tarojs/taro";
import { generateUnionID, isTrue } from "./index";
import { Payment, CZ} from "../constant";

// 发起支付宝支付
export default function toPay() {
  return async function(dispatch, getState) {
    Taro.showLoading({
      title: "发起支付中...",
      mask:true
    });
    let state = getState();
    let pay = state.pay;
    let store = state.store;
    let user = state.user;
    let discount = state.discount;
    let ddh = generateUnionID();
    let res_login = {code:user.login_code};
    let send_data = {
      store_id: store.store_id,
      storeb_id: store.storeb_id,
      member_id: user.member_id,
      money: pay.money,
      // discounted_money:payInfo.discounted_money,
      xflx: pay.xflx,
      ddh: ddh,
      password: pay.password,
      use_red_envelop: pay.use_red_envelop,
      is_cz: pay.is_cz,
      xjq_me: discount.xjq_me,
      xjq_id: discount.xjq_id,
      xjq_bl:discount.xjq_bl,
      dtgd_zk: discount.dtgd_zk,
      code:res_login.code
    };
    // 充值支付时，数据需处理下
    if(pay.xflx == Payment.SM_CZ){
      send_data = Object.assign(send_data, CZ);
    }
    console.log(state);
    let res = await Taro.request({
      method: "POST",
      url: "https://pay.cnqilian.com/index.php?act=index3&op=ddxr",
      data: send_data,
      header: {
        "content-type": "application/x-www-form-urlencoded"
      }
    });

    let data = res.data;
    Taro.hideLoading();
    let status = data.status;
    let xflx = pay.xflx;
    let use_red_envelop = pay.use_red_envelop;
    let message = "";

    switch (status) {
      case 0:
        if (xflx == Payment.SM_CZ) {
          message = "充值余额不足!";
        } else if (use_red_envelop == 1) {
          message = "红包余额不足!";
        }
        break;
      case 1:
        Taro.navigateTo({ url: "/pages/success/success?ddh=" + ddh });
        break;
      case 2:
        Taro.navigateTo({ url: "/pages/success/success?ddh=" + ddh });
        break;
      case 3:
        message = "支付密码错误";
        break;
      case 4:
        break;
      case 5:
        message = res.data["error"];
        break;
      case 6:
        message = "请先绑定手机号码！";
        break;
      default:
        if(store.store_id == 5418)
          message = 'err:'+data;
        else
          message = "发生未知错误！";
        break;
    }

    // 支付失败，显示提示信息
    if (message != "" && status != undefined) {
      Taro.showModal({
        content: message,
        showCancel: false
      });
      return;
    }
    // 准备发起支付
    if (isTrue(data.tradeNO)) {
      my.tradePay({
        // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
        tradeNO: data.tradeNO,
        // tradeNO: '2021080422001467991406321238',
        success: (res1) => {
          if(res1.resultCode == '9000'){
            Taro.redirectTo({
              url: "/pages/success/success?ddh=" + ddh
            });
          }
        },
        fail: () => {
          console.log('fail');
        }
      });
    }
  };
}

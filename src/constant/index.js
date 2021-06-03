/**
 * Taro内置环境变量
 */
export const TARO_ENV = process.env.TARO_ENV;
/**
 * 扫码微信支付
 */
export const SM_WXPAY = "SM_WXPAY";
/**
 * 扫码支付宝支付
 */
export const SM_ALIPAY = "SM_ALIPAY";
/**
 * 扫码充值支付
 */
export const SM_CZ = "SM_CZ";
/**
 * 在线支付别名，根据环境来返回值
 */
export const SM_XS = TARO_ENV==="weapp"?"SM_WXPAY":"SM_ALIPAY";

export const Payment = {
  SM_WXPAY,
  SM_ALIPAY,
  SM_CZ,
  SM_XS
}

export const RESET_INFO = {
  type: "TOPAY",
  payload: {
    money: "",
    xjq_me: 0,
    xjq_id: 0,
    use_red_envelop: 1,
    password:'      '
  }
}

export const CZ = {
  use_red_envelop:0,
  xjq_me:0,
  xjq_id:0,
  dtgd_zk:100,
  is_cz:0
}

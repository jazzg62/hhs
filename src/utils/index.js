import Taro from '@tarojs/taro';

/**
 * 生成一个唯一的id
 * @example let id = generateUnionID();
 * @returns
 */
export function generateUnionID() {
  // 先获取当前时间戳
  var time = new Date().getTime();
  var res = (time + "").split("");
  const RAND_S = "1234567890";
  const LENGTH = 18;
  // 后面的数字用random来获取
  for (var i = res.length; i < LENGTH; i++) {
      res.push(RAND_S[parseInt(Math.random() * RAND_S.length)]);
  }
  return res.join("");
}

/**
 * 时间戳格式化
 * @example formatDate(new Date(+res.addtime*1000), 'yyyy-MM-dd hh:mm')
 * @param {*} date
 * @param {*} fmt
 * @returns
 */
export function formatDate(date, fmt) {
  var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 给数字保留两位小数,四舍五入
 * @example let a = toFixed(2); // return 2.00
 * @param {*} val
 * @returns
 */
export function toFixed2(val){
  try{
    return val!=0?Number(val).toFixed(2):0
  }catch(e){
    console.warn(e);
    return 0;
  }
}

/**
 * 消费类型转译
 * @example let a = transXFLX('SM_WXPAY'); // return 扫码微信支付
 * @param {*} val
 * @returns
 */
export function transXFLX(val){
  switch(val){
    case 'SM_WXPAY':
      return '扫码微信支付';
    case 'SM_ALIPAY':
      return '扫码支付宝支付';
    case 'SM_QLB':
      return '扫码红包支付';
    case 'SM_CZ':
      return '扫码充值支付';
    default:
      return '微信支付';
  }
}


/**
 * 检查对象是否为真值
 * @param {*} val
 * @returns
 */
export function isTrue(val){
  if(val == 0 || val == undefined || val == '' || val == ' ' || val == '0' || val == null )
    return false;
  return true;
}

/**
 * 计算折扣
 * @example
 * calcZK(100) // return ''
 * calcZK(80)  // return '8折'
 * calcZK(89)  // return '89折'
 * @param {number} val
 */
export function calcZK(val){
  val = Number(val);
  if(val>=100 || Number.isNaN(val)){
    return '';
  }
  if(val%10==0){
    return val/10+'折'
  }
  return val+'折';
}

/**
 * 获取完折扣后调用，跳转到折扣页
 */
export function redirect_discount(){
  Taro.hideLoading();
  Taro.navigateTo({
    url: '/pages/discount/discount?timeStamp='+new Date().getTime()
  })
}

/**
 * 检查对象是否是函数
 * @param {*} val
 * @returns {boolean}
 */
export function is_function(val){
  var toString = Object.prototype.toString;
  if(toString.call(val) === '[object Function]'){
    return true;
  }
  return false;
}

/**
 * 转换距离
 * @param {*} jl
 * @returns
 */
export function translate_jl(jl){
  jl = Number(jl);
  if(jl < 1000){
    return jl + 'm';
  }else {
    return (jl/1000).toFixed(1) + 'km';
  }
}

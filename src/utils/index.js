// 生成一个唯一的id
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

export function toFixed2(val){
  try{
    return val!=0?Number(val).toFixed(2):0
  }catch(e){
    console.warn(e);
    return 0;
  }
}

export function transXFLX(val){
  switch(val){
    case 'SM_WXPAY':
      return '扫码微信支付';
    case 'SM_ALIPAY':
      return '扫码支付宝支付';
    case 'SM_QLB':
      return '扫码红包支付';
    default:
      return '微信支付';
  }
}

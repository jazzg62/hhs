/**
 * @param {*} money
 * 设置支付金额
 * @returns
 */
export function setMoney(money){
  return {
    type:'SETMONEY',
    money:Number(money)
  }
}

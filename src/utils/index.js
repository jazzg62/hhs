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

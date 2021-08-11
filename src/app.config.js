let pages = [];
switch (process.env.TARO_ENV) {
  case "weapp":
    pages = [
      "pages/index/index",
      "pages/pay/pay",
      "pages/phone/phone",
      "pages/share/share",
      "pages/welcome/welcome",

      "pages/scan/scan",
      "pages/discount/discount",
      "pages/password/password",
      "pages/success/success"
    ];
    break;
  case "alipay":
    pages = [
      "pages/index/index",
      // "pages/pay/pay",
      // "pages/phone/phone",
      // "pages/share/share",
      "pages/welcome/welcome",

      "pages/scan/scan",
      "pages/discount/discount",
      "pages/password/password",
      "pages/success/success"
    ];
    break;
  default:
    break;
}

export default {
  pages,
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "企联商务",
    navigationBarTextStyle: "black"
  }
};

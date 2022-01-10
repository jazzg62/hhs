/* eslint-disable import/no-mutable-exports */
let _ = {};
switch (process.env.TARO_ENV) {
  case "weapp":
    _ = {
        pages:[
          "pages/index/index",
          "pages/pay/pay",
          "pages/phone/phone",
          "pages/share/share",
          "pages/welcome/welcome",
          "pages/navigate/navigate",

          "pages/scan/scan",
          "pages/discount/discount",
          "pages/password/password",
          "pages/success/success",
          'pages/shouye/shouye',

          //2021年12月19日 引流拓客
          'pages/quanbudingdan/quanbudingdan',
          'pages/zichanmingxi2/zichanmingxi2',
          'pages/shangpinxiangqing1/shangpinxiangqing1',
          'pages/chakanquanma2/chakanquanma2',
          'pages/wode/wode'
        ],
        window: {
          backgroundTextStyle: "light",
          navigationBarBackgroundColor: "#fff",
          navigationBarTitleText: "企联商务",
          navigationBarTextStyle: "black"
        },
        tabBar: {
          custom: true,
          color: '#000000',
          selectedColor: '#000000',
          backgroundColor: '#000000',
          list: [
            { pagePath: 'pages/shouye/shouye', text: '首页' },
            { pagePath: 'pages/wode/wode', text: '我的' }
          ]
        },
        usingComponents: {
          'painter':'./components/painter/painter',
          'wxParse':'./components/wp/wp'
        },
        permission: {
          'scope.userLocation': { desc: '你的位置信息将用于获取当地优惠信息' }
        },
    }
    break;
  case "alipay":
    _ = {
      pages:[
        "pages/index/index",
        // "pages/pay/pay",
        // "pages/phone/phone",
        // "pages/share/share",
        "pages/welcome/welcome",

        "pages/scan/scan",
        "pages/discount/discount",
        "pages/password/password",
        "pages/success/success"
      ],
      window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fff",
        navigationBarTitleText: "企联商务",
        navigationBarTextStyle: "black"
      }
    }
    break;
  default:
    break;
}

export default _;

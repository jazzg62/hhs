Component({
  data: {
    selected:0,
    tab_list: [{
        id:1,
        name: '首页',
        path: '/pages/shouye/shouye',
        img:require('../res/local/16391903651154886538.png'),
        selected_img:require('../res/local/16391146130275560527.png')
    },{
        id:2,
        name: '我的',
        path: '/pages/wode/wode',
        img:require('../res/local/16391146130270751893.png'),
        selected_img:require('../res/local/16391903651150652683.png')
        // img:'/res/local/16391146130270751893.png',
        // selected_img:'/res/local/16391903651150652683.png'
    },
    {
        id:3,
        name:'惠花生',
        path:'hui',
        img:require('../res/local/hui.png'),
        selected_img:require('../res/local/hui.png')
    }
  ]
},
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      if(url == 'hui'){
        wx.redirectTo({
          url:'/pages/index/index?src='+encodeURIComponent('https://www.cnql888.com/wap/gyl/index.html?ly=yltk')
        })
        return ;
      }
      wx.switchTab({url})
    }
  }
})

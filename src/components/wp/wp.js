import wxParse from '../wxParse/wxParse'

// eslint-disable-next-line no-undef
Component({
    properties: {
        html: {
            type: String,
            value: '',
        },
    },
    observers: {
        html: function () {
          wxParse.wxParse('article', 'html', this.properties.html, this)
        },
    },
})

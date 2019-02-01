var WxParse = require('../wxParse/wxParse.js');

import { Diary } from 'diary-model.js';
var diary = new Diary(); 
Page({

  data: {
    article: '',
    loadingHidden: false
  },
  onLoad: function (options) {
    this.data.titleName = options.name;
    this.data.id = options.id;

    wx.setNavigationBarTitle({
      title: options.name
    });
    this._loadData();
  },

  /*加载所有数据*/
  _loadData: function (callback) {
    
    var that = this;
    diary.getDetail(this.data.id, (data) => {
      
      that.data.article = data.content,

        callback && callback();

        var temp = WxParse.wxParse('article', 'html', that.data.article, that, 0);

    });

    that.setData({
      loadingHidden: true
    });
  },

  onShareAppMessage: function () {
    return {
      title: this.data.name,
      path: 'pages/diary/diary' + this.data.id
    }
  }

})



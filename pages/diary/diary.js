import { Diary } from 'diary-model.js';
var diary = new Diary(); //实例化 首页 对象
Page({

  data: {
    loadingHidden: false
  },
  onLoad: function (option) {
    var id = option.id;
    this.data.id = id;
    this._loadData();

    
  },

  /*加载所有数据*/
  _loadData: function (callback) {
    
    var that = this;
    diary.getDetail(this.data.id, (data) => {
      that.setData({
        diaryArr: data.imgs
      });
      wx.setNavigationBarTitle({ title: data.name });
      callback && callback();
    });
  },

})



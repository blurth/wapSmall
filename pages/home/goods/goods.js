import { Detail } from 'goods-model.js';
var WxParse = require('../../wxParse/wxParse.js');
var detail = new Detail();
Page({
  data: {
    loadingHidden: false,
    hiddenSmallImg: true,
    countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    productCounts: 1,
    currentTabsIndex: 0,
    cartTotalCounts: 0,
  },

  /**
   * 页面的初始数据
   */
  onLoad: function (options) {

 
    this.data.id = options.id;
    this._loadData();

  },


  _loadData: function (callback) {

    var that = this;
    detail.getDetail(this.data.id, (data) => {
      that.data.article = data.content,
      that.setData({
        goodsArr: data,
        loadingHidden:true
      });
      
      wx.setNavigationBarTitle({ title: data.name });
      callback && callback();
      var temp = WxParse.wxParse('article', 'html', that.data.article, that, 0);
      
    });

    

  },
/**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  cutOpen: function (event){
    var id = detail.getDataSet(event, 'id');
    var from = detail.getDataSet(event,'from');
     wx.navigateTo({
       url: '../cut/cut?id='+id+'&from='+from
     })
  },


  //切换详情面板
  onTabsItemTap: function (event) {
    var index = detail.getDataSet(event, 'index');
    this.setData({
      currentTabsIndex: index
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
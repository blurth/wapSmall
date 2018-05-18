// pages/special/huodong/huodong.js
var WxParse = require('../../wxParse/wxParse.js');



import { Huodong } from 'huodong-model.js';
var huod = new Huodong();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: '<div style="text-align:center;">《静夜思》· 李白<br />床前明月光，<br />疑是地上霜。 <br />举头望明月， <br />低头思故乡。<br /><img src="http://www.xiexingcun.com/Poetry/6/images/53e.jpg" alt="" /><br /><img src="http://www.xiexingcun.com/Poetry/6/images/53.jpg" alt="" /><br /><br />床前明月光，<br /><img src="http://www.xiexingcun.com/Poetry/6/images/53b.jpg" alt="" /><br /></div>',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.data.titleName = options.name;
this.data.id = options.id;
wx.setNavigationBarTitle({
  title: options.title
});
this._loadData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /*加载所有数据*/
  _loadData: function (callback) {
    var that = this;
    /*获取单品列表信息*/
    huod.getHuodData(this.data.id, (data) => {
      that.setData({
        huodInfo: data.imgs,
      });
      callback && callback();
    });

    var temp = WxParse.wxParse('article', 'html', that.data.article, that, 5);


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
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
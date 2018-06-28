import { Special } from 'special-model.js';
var special = new Special();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },
  /*加载所有数据*/
  _loadData: function (callback) {

    var that = this;

    special.getDetail((data) => {
     
      for (var i = 0; i < data.length; i++){
        data[i].create_time = data[i].create_time.substr(5, 6);
        }


       that.setData({
       specialyArr: data,
  
      });
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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

  
  onSpecialClick: function (event){
    var id = special.getDataSet(event, 'id');
    var title = special.getDataSet(event,'title')
 
    wx.navigateTo({
      url: 'huodong/huodong?id=' + id + '&title=' + title,
    }) 

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
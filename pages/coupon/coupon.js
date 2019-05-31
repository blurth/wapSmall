import { Coupon } from 'coupon-model.js';

var coupon = new Coupon();  //实例化
// pages/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    ticket:false
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
    //获取banner
    coupon.getUserTicket((data) => {
      if(data){
        that.setData({
          ticket: data
        });
      }

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

  /**
   * 生命周期函数--监听页面卸载
   */
  handleChange({ detail }) {
    var that = this;
    that.setData({
      current: detail.key
    });
    //获取banner
    coupon.getUserTicket((data) => {
      if (data) {
        that.setData({
          ticket: data
        });
      }

    });
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
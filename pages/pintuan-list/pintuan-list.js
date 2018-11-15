// pages/pintuan-list/pintuan-list.js
import { Plist } from 'plist-model.js';
var plist = new Plist(); 

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

  _loadData:function(){

      plist.getAllPtlist((data) => {
    
        this.setData({
          ptlist: data
        })
  
      });
  },

  onGoodsItemTap: function (event) {
    var id = plist.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../home/goods/goods?id=' + id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
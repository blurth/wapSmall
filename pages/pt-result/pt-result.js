import {PtResult} from 'pt-result-model.js';
var result = new PtResult();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     id:null,
    autoplay: !![],
    interval: 1e4,
    duration: 500,
    goodsDetail: {},
    swiperCurrent: 0,
    hasMoreSelect: ![],
    selectSizePrice: 0,
    shopNum: 0,
    hideShopPopup: !![],
    buyNumber: 0,
    buyNumMin: 1,
    buyNumMax: 0,
    favicon: 0,
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,
    propertyChildIds: "",
    propertyChildNames: "",
    canSubmit: ![],
    shopCarInfo: {},
    selectptPrice: 0,
    wxlogin: !![],
    sharebox: !![],
    sharecode: !![]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
      var id = options.id;

      console.log(options);
      
    this._loadData(id);
  },


  _loadData: function (id) {
    let that = this

    result.getGoods(id,(data)=>{
      that.setData({
        goodsArr: data
      })
    })


    result.isPtSelf(id, (data) => {
      that.setData({
        pingList: data
      })
    })


    
    
      that.setData({
        id: id
      })
    
   
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
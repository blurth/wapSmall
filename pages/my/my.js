//import { Address } from '../../utils/address.js';
//import { Order } from '../order/order-model.js';
import { My } from '../my/my-model.js';

// var address = new Address();
// var order = new Order();
var my = new My();

Page({
  data: {
    pageIndex: 1,
    isLoadedAll: false,
    loadingHidden: false,
    orderArr: [],
    addressInfo: null
  },
  onLoad: function () {
    this._loadData();
    //this._getAddressInfo();
  },

  onShow: function () {
    //更新订单,相当自动下拉刷新,只有  非第一次打开 “我的”页面，且有新的订单时 才调用。
    // var newOrderFlag = order.hasNewOrder();
    // if (this.data.loadingHidden && newOrderFlag) {
    //   this.onPullDownRefresh();
    // }
  },

  _loadData: function () {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    } else {
      that.setData({
        userInfo: userInfo
      })
    }

    // this._getOrders();
    // order.execSetStorageSync(false);  //更新标志位
  },

  



})
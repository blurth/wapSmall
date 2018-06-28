import { Address } from '../../utils/address.js';
import { Order } from '../order/order-model.js';
import { My } from '../my/my-model.js';

var address = new Address();
 var order = new Order();
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
  /*修改或者添加地址信息*/
  editAddress: function () {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        var addressInfo = {
          name: res.userName,
          mobile: res.telNumber,
          totalDetail: address.setAddressInfo(res)
        };
        if (res.telNumber) {
          that._bindAddressInfo(addressInfo);
          //保存地址
          address.submitAddress(res, (flag) => {
            if (!flag) {
              that.showTips('操作提示', '地址信息更新失败！');
            }
          });
        }
        //模拟器上使用
        else {
          that.showTips('操作提示', '地址信息更新失败,手机号码信息为空！');
        }
      }
    })
  },

  /*绑定地址信息*/
  _bindAddressInfo: function (addressInfo) {
    this.setData({
      addressInfo: addressInfo
    });
  },

  //点击跳转：订单页面
  OnTapOrder: function (event) {
    var index = my.getDataSet(event, 'index');
    wx.navigateTo({
      url: '../myorder/myorder?index=' + index,
    })
  },
  
  onCartTap:function(){
    wx.navigateTo({
      url: "/pages/cart/cart"
    })
  },
  onCoupons:function(){
    wx.showModal({
      title: '暂未开放',
      content: '',
    })
  },
  onHuoTap: function () {
    wx.navigateTo({
      url: "/pages/special/special"
    })
  }

  



})
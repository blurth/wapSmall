import { MyOrder } from './myorder-model.js';
var myOrder = new MyOrder();
import { Order } from '../order/order-model.js';
var order = new Order();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNav: ['全部', '待付款', '已支付', '已核销'],
    currenttabsIndex: 0,
    index: '',
    showOrderDetailInfo:'showOrderDetailInfo',
    cut:'cut'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = options.index;
    this._loadData(index);
  },

  _loadData: function (index) {
    myOrder.getMyOrder(index, (res) => {
      this.setData({
        myOrderList: res.data,
        currenttabsIndex: index
      })
    });
  },


  //切换订单状态
  OnTapOrderNav: function (event) {
    //var index = event.currentTarget.dataset.index;
    var index = order.getDataSet(event, "index");
    myOrder.getMyOrder(index, (res) => {
      this.setData({
        myOrderList: res.data,
        currenttabsIndex: index
      })
    });

  },

  //订单详情
  showOrderDetailInfo: function (event) {
    var id = order.getDataSet(event, 'id');
    console.log(id);
    wx.navigateTo({
      url: '../order/order?from=order&id=' + id,
    });
  },


  /*
   * 进行第二次支付
   */
  rePay: function (event) {
    var id = myOrder.getDataSet(event, 'id');
    var index = myOrder.getDataSet(event, 'index');
    this._execPay(id, index);
  },

  _execPay: function (id, index) {
    var that = this;
    //调用支付返回结果有延迟 1-2秒
    order.execPay(id, (statusCode) => {
      //支付成功还是失败 1 ：失败   2：成功
      if (statusCode > 0) {
        // var flag = statusCode = 2;
        var flag = statusCode;
        // }
        //跳转到成功页面
        wx.navigateTo({
          url: '../pay-result/pay-result?id=' + id + '&flag=' + flag + '&from=my',
        })
      } else {
        that.showTips('支付失败', '商品已下架或库存不足');
      }

    })
  }


})
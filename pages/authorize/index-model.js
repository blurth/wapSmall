
import { Base } from '../../utils/base.js';

class Index extends Base {
  constructor() {
    super();
  }

  /*
   * 获取购物车
   * param
   * flag - {bool} 是否过滤掉不下单的商品
   */
  saveUserDetail(callback) {
    let userInfo = wx.getStorageSync('userInfo');
    var param = {
      url: 'token/up',
      type:'post',
      data: { user: userInfo},
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);

 
  };


  /*下订单*/
  doOrder(param, callback) {
    var that = this;
    var allParams = {
      url: 'order',
      type: 'post',
      data: { products: param },
      sCallback: function (data) {
        that.execSetStorageSync(true);
        callback && callback(data);
      },
      eCallback: function () {
      }
    };
    this.request(allParams);
  }
  
}


export { Index };
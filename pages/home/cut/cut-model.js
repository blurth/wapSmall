
import { Base } from '../../../utils/base.js';

class Cut extends Base {
  constructor() {
    super();
  }

  getCutResult(id,callback) {
    var userInfo = wx.getStorageSync('userInfo');
    var avatarUrl = userInfo.avatarUrl;
    var nickName = userInfo.nickName;
    var param = {
      type: 'post',
      url: 'cut/self_cut',
      data: { 
        goodsId: id,
        avatar: avatarUrl,
        nick:nickName,
        avatar:avatarUrl
       },
      sCallback: function (data) {
        
        callback && callback(data);
      }
    };
    this.request(param);
  }

  
  getlist(self_id, callback) {
    var param = {
      url: 'cut/list?self_id=' + self_id,

      sCallback: function (data) {

        callback && callback(data);
      }
    };
    this.request(param);
  }


  getCut(goods_id,callback){
    var param = {
      url: 'cut/getCut?goods_id=' + goods_id,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  
  getGoods(goods_id,callback){
    var param = {
      url: 'goods/'+goods_id,
      sCallback: function (data) {

        callback && callback(data);
      }
    };
    this.request(param);
  }







  preOrder(selfId, callback) {
    
    var param = {
      url: 'token/seflcut',
      type: 'post',
      data: { selfID: selfId },
      sCallback: function (data) {

        callback && callback(data);
      }
    }
    this.request(param);
  }

  /*
  * 拉起微信支付
  * params:
  * norderNumber - {int} 订单id
  * return：
  * callback - {obj} 回调方法 ，返回参数 可能值 0:商品缺货等原因导致订单不能支付;  1: 支付失败或者支付取消； 2:支付成功；
  * */
  execPay(orderNumber, callback) {
    var allParams = {
      url: 'pay/pay_cut',
      type: 'post',
      data: { id: orderNumber },
      sCallback: function (data) {
        var timeStamp = data.timeStamp;
        if (timeStamp) { //可以支付
          wx.requestPayment({
            'timeStamp': timeStamp.toString(),
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'paySign': data.paySign,
            success: function () {
              callback && callback(2);
            },
            fail: function () {
              callback && callback(1);
            }
          });
        } else {
          callback && callback(0);
        }
      }
    };
    this.request(allParams);
  }












};

export { Cut };
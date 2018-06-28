
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


  cutBuy(){
    return 123;
  }

};

export { Cut };
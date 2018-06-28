
import { Base } from '../../../utils/base.js';

class Hcut extends Base {
  constructor() {
    super();
  }

  helpCut(self_id, callback) {
    var userInfo = wx.getStorageSync('userInfo');
    var avatarUrl = userInfo.avatarUrl;
    var nickName = userInfo.nickName;

    var param = {
      type: 'post',
      url: 'cut/help_cut',
      data: {
        self_id: self_id,
        nick: nickName,
        avatar: avatarUrl
       },
      sCallback: function (data) {

        callback && callback(data);
      }
    };
    this.request(param);
  }

  getSelf(self_id, callback) {
    var param = {
      url: 'cut/getHcutInfo?self_id=' + self_id,

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

  verify(self_id,callback) {
    var param = {
      url: 'cut/verifyHelp?self_id='+self_id,

      sCallback: function (data) {

        callback && callback(data);
      }
    };
    this.request(param);
  }

  getGoods(goods_id, callback) {
    var param = {
      url: 'goods/'+goods_id,

      sCallback: function (data) {

        callback && callback(data);
      }
    };
    this.request(param);
  }

}
export { Hcut };
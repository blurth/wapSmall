/**
 * Created by jimmy on 17/03/09.
 */

import {Base} from '../../utils/base.js'

class PtResult extends Base{

    constructor(){
        super();
    }

  isPtSelf(id, callback) {
    var param = {
      url: 'ptuan/isptuan?goods_id=' + id,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

    getGoods(id, callback) {
        var param = {
          url: 'goods/' + id,
          sCallback: function (data) {
            callback && callback(data);
          }
        };
        this.request(param);
      }

    /*获取当前拼团的列表*/
    doOrder(param,callback){
        var that=this;
        var allParams = { 
          url: 'order',
            type:'post',
            data:{products:param},
            sCallback: function (data) {
                that.execSetStorageSync(true);
                callback && callback(data);
            },
            eCallback:function(){
                }
            };
        this.request(allParams);
    }



  

}

export {PtResult};
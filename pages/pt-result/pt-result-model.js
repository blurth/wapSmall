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


    payBack(id,callback){
      var param = { 
        url: 'ptuan/paybak',
          type:'put',
          data:{id:id},
          sCallback: function (data) {
              callback && callback(data);
          }
          };
      this.request(param);
  }

  

}

export {PtResult};
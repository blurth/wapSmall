
import { Base } from '../../../utils/base.js';

class Detail extends Base {
  constructor() {
    super();
    this._storageKeyName='pt';
  }

   /*
    * 获取购物车
    * param
    * flag - {bool} 是否过滤掉不下单的商品
    */
   getPtDataFromLocal(flag){
    var res = wx.getStorageSync(this._storageKeyName);
    
    if(!res){
        res=[];
    }
    //在下单的时候过滤不下单的商品，
    if(flag){
      
        var newRes=[];
           
                newRes.push(res);
        
        res=newRes;
      
    }
 
    return res;
   
};


  getDetail(id, callback) {
    var param = {
      url: 'goods/' + id,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

}
export { Detail };
import { Base } from '../../utils/base.js';

class Special extends Base {
  constructor() {
    super();
  }
  getDetail(callback){
    var param = {
      url: 'special/all',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
   



}

export{Special}
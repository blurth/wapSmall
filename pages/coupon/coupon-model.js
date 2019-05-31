import { Base } from '../../utils/base.js';

class Coupon extends Base {
  constructor() {
    super();
  }


  getUserTicket(callback) {
    var param = {
      url: 'ticket/getuser',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }





  }

export { Coupon };
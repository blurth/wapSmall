import { Base } from '../../utils/base.js';
class MyOrder extends Base {
  constructor() {
    super();
  }

  getMyOrder(index, callback) {
    var params = {
      'url': '/order/by_user?typeid=' + index,
      sCallback: function (data) {
        callback && callback(data)
      }
    };

    this.request(params);
  }
}

export { MyOrder }
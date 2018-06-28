
import { Base } from '../../../utils/base.js';

class Detail extends Base {
  constructor() {
    super();
  }

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
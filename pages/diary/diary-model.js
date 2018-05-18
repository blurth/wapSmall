
import { Base } from '../../utils/base.js';

class Diary extends Base {
  constructor() {
    super();
  }

  getDetail(id, callback) {
    var param = {
      url: 'diary/' + id,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

}
export { Diary };
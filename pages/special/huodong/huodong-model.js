import { Base } from '../../../utils/base.js';
class Huodong extends Base {
  constructor() {
    super();
  }

  getHuodData(id, callback) {
    var param = {
      url: 'special/' + id,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }




}

export{ Huodong};
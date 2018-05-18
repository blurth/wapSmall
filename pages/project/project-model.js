import { Base } from '../../utils/base.js';

class Project extends Base{
  constructor() {
    super();
  }


  getProjectData(callback) {
    
    var that = this;
    var param = {
      url: 'project/all',

      sCallback: function (data) {
        data = data;
        callback && callback(data);
      }
    };
    this.request(param);
  }

}
export { Project };
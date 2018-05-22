/**
 * Created by jimmy on 17/2/26.
 */
import { Base } from '../../utils/base.js';

class Category extends Base {
  constructor() {
    super();
  }

  /*获得所有分类*/
  getCategoryType(callback) {
    var param = {
      url: 'category/all',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  getCategoryMore(id, cont, callback) {
    var param = {
      url: 'diary/gdbc?id=' + id + '&cont=' + cont,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }


  //获取banner
  getBannerData(callback) {
    var that = this;
    var param = {
      url: 'banner/2',

      sCallback: function (data) {
        data = data.items;
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //获取: 全部案例
  getCasesListData(callback) {
    var parmas = {
      url: 'diary/gdbc?id=2&cont=1',
      sCallback: function (data) {
        callback && callback(data)
      }
    }
    this.request(parmas);
  }

  //获取: 对应分类下案例
  getDiariesByCategory(id, callback) {
    var parmas = {
      url: 'diary/gdbc?id=' + id + '&cont=1',
      sCallback: function (data) {
        callback && callback(data)
      }
    }
    this.request(parmas);
  }
}

export { Category };
import { Base } from '../../utils/base.js'
class Doctor extends Base {
  constructor() {
    super();
  }

  //获取分类: 全部分类
  getDoctorCategoryData(callback) {
    var parmas = {
      url: 'article/catelist',
      sCallback: function (data) {
        callback && callback(data)
      }
    }
    this.request(parmas);
  }

  //获取列表信息: 全部专家
  getDoctorListData(nextUrl, callback) {
    var parmas = {
      url: 'article/list?start=' + nextUrl + "&count=8",
      sCallback: function (data) {
        callback && callback(data)
      }
    }
    this.request(parmas);
  }

  //获取列表信息: 根据ID获取该分类下专家
  getCateDocData(tempArr, callback) {
    var parmas = {
      url: 'article/getcate/' + tempArr.id + '?start=' + tempArr.nextUrl + "&count=8",
      sCallback: function (data) {
        callback && callback(data)
      }
    }
    this.request(parmas);
  }

  //搜索
  getSearchResultData(text, callback) {
    var parmas = {
      url: 'article/search?title=' + text,
      sCallback: function (data) {
        callback && callback(data)
      }
    }
    this.request(parmas);
  }

  // 点赞
  userLike(id, callback) {
    var parmas = {
      url: 'article/like/' + id,
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data)
      }
    }
    this.request(parmas);
  }


}
export { Doctor }
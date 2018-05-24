import { Meigou } from 'meigou-model.js';
var meigou = new Meigou();  //实例化 home 的推荐页面
Page({
  data: {
    transClassArr: ['tanslate0', 'tanslate1', 'tanslate2', 'tanslate3', 'tanslate4', 'tanslate5', 'tanslate6'],
    currentMenuIndex: 0,
    loadingHidden: false,
  },
  onLoad: function () {
    this._loadData();
  },

  /*加载所有数据*/
  _loadData: function (callback) {
    var that = this;
    meigou.getMeigouType((meigouData) => {

      that.setData({
        categoryTypeArr: meigouData,
        loadingHidden: true
      });

      meigou.getProductsByMeigou(meigouData[0].id, (data) => {
        var dataObj = {
          procucts: data,
          topImgUrl: meigouData[0].img.url,
          title: meigouData[0].name
        };
        that.setData({
          loadingHidden: true,
          categoryInfo0: dataObj
        });
        callback && callback();
      });
    });
  },

  /*切换分类*/
  changeCategory: function (event) {
    var index = meigou.getDataSet(event, 'index'),
      id = meigou.getDataSet(event, 'id')//获取data-set
    this.setData({
      currentMenuIndex: index
    });

    //如果数据是第一次请求
    if (!this.isLoadedData(index)) {
      var that = this;
      this.getProductsByCategory(id, (data) => {
        that.setData(that.getDataObjForBind(index, data));
      });
    }
  },

  isLoadedData: function (index) {
    if (this.data['categoryInfo' + index]) {
      return true;
    }
    return false;
  },

  getDataObjForBind: function (index, data) {
    var obj = {},
      arr = [0, 1, 2, 3, 4, 5, 6],
      baseData = this.data.categoryTypeArr[index];
    for (var item in arr) {
      if (item == arr[index]) {
        obj['categoryInfo' + item] = {
          procucts: data,
          topImgUrl: baseData.img.url,
          title: baseData.name
        };

        return obj;
      }
    }
  },

  getProductsByCategory: function (id, callback) {
    meigou.getProductsByMeigou(id, (data) => {
      callback && callback(data);
    });
  },

  /*跳转到商品详情*/
  onProductsItemTap: function (event) {
    var id = meigou.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },

  /*下拉刷新页面*/
  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },

  //分享效果
  onShareAppMessage: function () {
    return {
      title: '零食商贩 Pretty Vendor',
      path: 'pages/category/category'
    }
  }

})
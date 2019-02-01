import { Category } from 'category-model.js';

var category = new Category();  //实例化

Page({
  data: {
    id: 2,
    pageindex: 1,
    currenttabsIndex: 0,
    loadingHidden: false,
    swiper: {
      autoplay: true,
      interval: 4000,
      duration: 200,
      currentDot: 0
    },
  },
  onLoad: function () {
    this._loadData();
  },

  /*加载所有数据*/
  _loadData: function (callback) {

    var that = this;
    //获取banner
    category.getBannerData((data) => {
      that.setData({
        swipers: data,
      });
    });

    //获取所有分类list
    category.getCategoryType((categoryData) => {
      that.setData({
        categoryTypeArr: categoryData,
        loadingHidden: true
      })

    });

    //获取: 全部案例
    category.getCasesListData((data) => {

      this.setData({
        diaryArr: data
      })
    });
  },


  onTabsItemTap: function (event) {

    this.data.pageindex = 1;
    var index = category.getDataSet(event, 'index');
    this.setData({
      currenttabsIndex: index
    })

    var id = category.getDataSet(event, 'id');

    category.getDiariesByCategory(id, (data) => {
      this.data.id = id;
      this.setData({
        diaryArr: data
      })
    });
  },


  getProductsByCategory: function (id, callback) {
    category.getProductsByCategory(id, (data) => {
      callback && callback(data);
    });
  },

  //轮播图触发事件
  getSwiperIndex(e) {
    this.setData({
      'swiper.currentDot': e.detail.current
    })
  },

  /*跳转到案例详情*/
  onDiaryItemTap: function (event) {
    var id = category.getDataSet(event, 'id');
    var name = category.getDataSet(event, 'name');
    wx.navigateTo({
      url: '../diary/diary?id=' + id + '&name=' + name
    })
  },

  /*下拉刷新页面*/
  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    var id = this.data.id;

    var cont = this.data.pageindex;

    var that = this;
    category.getCategoryMore(id, cont, (Data) => {

      if (Data) {
        this.data.pageindex++;
        that.setData({
          diaryArr: Data
        })
      }else{
        
      }

    });

  },

  //分享效果
  onShareAppMessage: function () {
    return {
      title: '西安悦华医疗美容',
      path: 'pages/category/category'
    }
  }

})
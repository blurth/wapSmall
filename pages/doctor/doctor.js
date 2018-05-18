import { Doctor } from 'doctor-model.js'
var doctor = new Doctor;
var util = require('../../utils/util.js');
var app = getApp();

Page({

  data: {
    id: null,
    currenttabsIndex: -1,
    containerShow: true,
    searchPanelShow: false,
    placeholder: '请输入关键词查询',
    totalCount: 0,
    isEmpty: true,
    loading: false
  },

  onLoad: function (options) {
    this._loadData();
  },

  _loadData() {
    doctor.getDoctorCategoryData((res) => {  //获取: 全部分类
      this.setData({
        docCategory: res.data
      })
    })

    this._loadzjAll();
  },

  //获取列表信息: 全部专家
  _loadzjAll: function () {
    doctor.getDoctorListData(0, (res) => {
      this.setData({
        docList: res.data
      })
    })
  },

  //获取列表信息: 对应分类下专家
  _loadZjByCategory: function (tempArr) {
    doctor.getCateDocData(tempArr, (res) => {
      this.setData({
        docList: res.data,
      })
    })
  },


  //切换分类：获取对应项目
  onTabsItemTapAll: function (event) {
    var index = doctor.getDataSet(event, 'index');
    this._loadzjAll();
    this.setData({
      currenttabsIndex: index,
      totalCount: 0,
      id: null
    })
  },

  onTabsItemTap: function (event) {
    var index = doctor.getDataSet(event, 'index'),
      id = doctor.getDataSet(event, 'id'),
      nextUrl = 0;
    var tempArr = { id: id, nextUrl: nextUrl };
    this.setData({
      currenttabsIndex: index,
      id: id,
      totalCount: 0
    })
    this._loadZjByCategory(tempArr);
  },




  //搜索文章
  onBindBlur: function (event) {
    var text = event.detail.value;
    this.data.text = text;

    if (this.data.text != '') {
      doctor.getSearchResultData(this.data.text, (res) => {
        console.log(res.data);
        this.setData({
          containerShow: false,
          searchPanelShow: true,
          docList: res.data
        })
      })
    }
  },

  oncancelImgTap: function (event) {
    this._loadzjAll();
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchInput: ''
    })
  },



  // 拨打电话
  callPhone: function (event) {
    util.PhoneCall();
  },

  //跳转到地图
  jumpMap: function (event) {
    util.MapAddress();
  },

  //跳转医师简介页面
  docDatail: function (event) {
    var id = doctor.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../doctor-page/doctor-page?id=' + id + '&from=doctor',
    })
  },

  //跳转专题详情页面
  ztDatail: function (event) {
    wx.navigateTo({
      url: '../zt-detail/zt-detail',
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var index = this.data.currenttabsIndex ? this.data.currenttabsIndex : app.globalData.xmIndex;
    this.setData({
      currenttabsIndex: index
    })
  },


  //点赞数
  onLike: function (event) {
    var id = doctor.getDataSet(event, 'id');

    doctor.userLike(id, (res) => {
      this.setData({
        status: res.data.status,
        likeCount: res.data.likeCount
      })

      var index = util.getProductIndexById(id, this.data.docList);
      this.data.docList[index].likeCount = this.data.likeCount;
      this.data.docList[index].isLike = this.data.status;
      this.setData({
        docList: this.data.docList
      })
    });
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (event) {
    //判断当前状态是否是搜索页面
    if (this.data.containerShow) { 
      wx.showNavigationBarLoading();
      this.data.docList = {};
      this.data.isEmpty = true;
      this.data.totalCount = 0;
      var id = this.data.id;
      var tempArr = { id: id, nextUrl: this.data.totalCount };
      if (id == null) {
        this._loadzjAll();
      } else {
        this._loadZjByCategory(tempArr);
      }
      wx.hideNavigationBarLoading();
    }
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (event) {
    //判断当前状态是否是搜索页面
    if (this.data.containerShow) {
      this.setData({
        loading: true
      })
      this.data.totalCount += 8;
      var id = this.data.id;
      var nextUrl = this.data.totalCount;
      var tempArr = { id: id, nextUrl: nextUrl };

      if (id == null) {   //id不存在:对应全部
        doctor.getDoctorListData(nextUrl, (res) => {
          this.existData(res.data);
        })
      } else {  //id存在：对应分类id
        doctor.getCateDocData(tempArr, (res) => {
          this.existData(res.data);
        })
      }
    }
  },


  //新旧数据绑定
  existData: function (data) {
    var totaldocList = {};
    if (data == '') {
      this.data.isEmpty = false;  //docList不为空
      totaldocList = this.data.docList;
      this.setData({
        loading: false
      })
    } else {
      totaldocList = this.data.docList.concat(data);
    }
    this.setData({
      docList: totaldocList,
      loading: false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
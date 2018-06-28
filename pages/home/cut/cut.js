import { Cut } from 'cut-model.js'
var cut = new Cut;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    loadingHidden: false,
   self_id:'',
   goods_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.goods_id = options.id;
    this._loadData();
  },

  _loadData: function () {
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    } else {
      that.setData({
        userInfo: userInfo
      })
    }
    //查看是否砍价 返回

    cut.getCut(this.data.goods_id,(data) => {
      this.data.self_id = data.id;
      this.setData({
        isSelfCut: data
      })

    if(data.id){
      cut.getlist(this.data.self_id, (data) => {
        this.setData({
          helpList: data
        })
      });
    }
    });


    cut.getGoods(this.data.goods_id,(data) => {
      this.setData({
        goodsArr: data,
        loadingHidden: true
      })
    });
 

  },
  // 自己砍价开始  self_cut
  selfCut: function () {

    cut.getCutResult(this.data.goods_id, (data) => {
      console.log(data);
      this.setData({
        isSelfCut: data.ishelp,
        helpList: data.helpList
      })
      wx.showToast({
        title: data.message,
        icon: 'succes',
        duration: 1000,
        mask: true
      })

    });

  },

  buy: function (event) {

    var selfId = cut.getDataSet(event,'id');

    cut.cutBuy(this.data.goods_id, selfId, (data) => {
    
     console.log(data);
    });
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var self_id = that.data.self_id;
    var goods_id = that.data.goods_id;

    return {
      title: '兄台 给我来一刀',
      path: 'pages/home/hcut/hcut?self_id=' + self_id + '&goods_id=' + goods_id
    }
  }

})
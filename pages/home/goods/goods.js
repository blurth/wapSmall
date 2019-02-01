import { Detail } from 'goods-model.js';
var WxParse = require('../../wxParse/wxParse.js');
var detail = new Detail();
Page({
  data: {
    ptuanCt:0,
    favicon:0,
    loadingHidden: false,
    hiddenSmallImg: true,
    countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    productCounts: 1,
    currentTabsIndex: 0,
    cartTotalCounts: 0,
    pintuan:false,
  },

  /**
   * 页面的初始数据
   */
  onLoad: function (options) {
    this.data.id = options.id;
    this._loadData();

  },
  onShow: function () {
    this._loadData();

  },

  _loadData: function (callback) {

    var that = this;
    detail.getDetail(this.data.id, (data) => {
      that.data.article = data.content;
      if(data.gnature == 2){
        that.setData({
          pintuan:true,
         
        });
      }
      that.setData({
        product:data,
        goodsArr: data,
        loadingHidden:true
      });
      
      wx.setNavigationBarTitle({ title: data.name });
      callback && callback();
      var temp = WxParse.wxParse('article', 'html', that.data.article, that, 0); 
      
    });

    detail.getPtlist(this.data.id,(data) => {
      that.setData({
        ptlist: data,
      });
    })

    detail.isPtSelf(this.data.id,(data) => {
  
      if(data.ptstatus == 1){
          that.setData({
            ptuanCt: 1,
          });
      }
   
    })

  },

  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  cutOpen: function (event){
    var id = detail.getDataSet(event, 'id');
    var from = detail.getDataSet(event,'from');
     wx.navigateTo({
       url: '../cut/cut?id='+id+'&from='+from
     })
  },
  ptOpen: function (event) {
    var id = detail.getDataSet(event, 'id');
    var from = detail.getDataSet(event, 'from');
    wx.navigateTo({
      url: '../ptuan/ptuan?id=' + id + '&from=' + from
    })
  },

  //切换详情面板
  onTabsItemTap: function (event) {
    var index = detail.getDataSet(event, 'index');
    this.setData({
      currentTabsIndex: index
    });
  },
  //参加拼团
  addPingTuan:function(event){
     this.pingtuan(event);
  },
       
  tobuy:function(event){
    var tempObj={},keys=['id','name','top_img','price'];
    
    var price = detail.getDataSet(event, 'price');
    this.data.account = price;
    for(var key in this.data.product){
      if(keys.indexOf(key)>=0){
          tempObj[key]=this.data.product[key];
      }
  }
  this._add(tempObj,this.data.productCounts);
  
    wx.navigateTo({
      url:'../../gorder/gorder?account='+this.data.account+'&from=goods'
    });
  },

      /*
    * 加入到购物车
    * 如果之前没有样的商品，则直接添加一条新的记录， 数量为 counts
    * 如果有，则只将相应数量 + counts
    * @params:
    * item - {obj} 商品对象,
    * counts - {int} 商品数目,
    * */
   _add(item,counts){


        item.counts=counts;
        item.selectStatus=true;  //默认在购物车中为选中状态
        var ptData=new Array();

        ptData.push(item);
    
  
        wx.setStorageSync('pt',item);
    
    
},

 
  pingtuan:function (event) {

    var tempObj={},keys=['id','name','top_img','price'];
    for(var key in this.data.product){
      if(keys.indexOf(key)>=0){
          tempObj[key]=this.data.product[key];
      }
  }
  this._add(tempObj,this.data.productCounts);
    var price = detail.getDataSet(event, 'price');
    this.data.account = price;
 
    wx.navigateTo({
      url:'../../porder/porder?account='+this.data.account+'&from=pt'
    });
  },
  goPingtuanTap:function (event) {
    var id = detail.getDataSet(event,'id');
    wx.navigateTo({
      url:'../../pt-result/pt-result?id=' + id
    });
    
  },





})
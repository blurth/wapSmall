import { Hcut } from 'hcut-model.js';
import { Token } from '../../../utils/token.js';

var hcut = new Hcut();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    self_id: '',
    goods_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that = this;
      that.data.self_id = options.self_id;
      that.data.goods_id = options.goods_id;
     
      that._loadData();
      


  },


  _loadData: function () {

    //查询是否帮朋友砍过价
    hcut.verify(this.data.self_id, (data) => {
      this.setData({
        reCut: data
      })
    });

//查询主砍表
    hcut.getSelf(this.data.self_id,(data) => {
      this.setData({
        selfCut: data
      })
    });

 
//获取商品信息
    hcut.getGoods(this.data.goods_id, (data) => {

      this.setData({
        goodsArr: data
      })
    });

//砍价列表
    hcut.getlist(this.data.self_id, (data) => {
      this.setData({
        helpList: data
      })
    });

  },



  helpCut:function(){

    var token = new Token();
    token.verify();

    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    } else {
      hcut.helpCut(this.data.self_id, (data) => {
        

        that.setData({
          helpArr: data
        });

        if (data.status == 3) {

          that.setData({
            kj_money: data.kj_money,
            reCut: true
          });
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          });
          //砍价列表
          hcut.getlist(this.data.self_id, (data) => {
            this.setData({
              helpList: data
            })
          });


        } else {
          wx.showToast({
            title: '失败',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }


      });


    }

    
   
    
   
  },

  onHome:function(){
   wx.switchTab({
     url: '../../../pages/home/home',
   })
   },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
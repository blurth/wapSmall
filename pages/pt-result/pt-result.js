import {PtResult} from 'pt-result-model.js';
var result = new PtResult();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId:0,
    id:null,
    cutting:false,
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.goodsId = options.id;
    this._loadData(options.id);
  },


  _loadData: function (id) {
    let that = this
   
    result.getGoods(id,(data)=>{
      
      that.setData({
        goodsArr: data
      })

    })


    result.isPtSelf(id, (data) => {
      let that = this
      
      that.data.id = data.id;

      if(data && !that.data.cutting){

        
        var dateTime = Date.now();
        var now_time = Math.floor(dateTime / 1000);

        var time = data.pt_end-now_time;

        countDown(that,time);
      }

      
      that.setData({
        pingList: data
      })
    })
  },

 
  

  gohome : function () {
    wx.switchTab({
      url: '../../pages/home/home',
    })
  },
  tuikuan: function () {
   let id = this.data.id;
   result.payBack(id,(data)=>{
         if(data){
           wx.navigateBack({
             delta: 1, // 回退前 delta(默认为1) 页面
             success: function(res){
               // success
             },
             fail: function() {
               // fail
             },
             complete: function() {
               // complete
             }
           })
         }
   });


    console.log(12312);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (!this.data.goodsId) {
      // todo 返回默认分享信息，比如小程序首页
    }
    return {
      title: '发现一件好物',
      path: '/pages/home/goods/goods?id=' + this.data.goodsId,
    };
  },

})


//倒计时
function countDown(that,time) {

  setTimeout(function(){
    time--;
    var lefttime = time;
    var d = parseInt(lefttime / (24 * 60 * 60));
    var h = parseInt(lefttime / (60 * 60) % 24);
    var m = parseInt(lefttime / 60 % 60);
    var s = parseInt(lefttime % 60);

    that.setData({
      countDownDay:d,
      countDownHour:h,
      countDownMinute:m,
      countDownSecond:s,
    })  

    if(time > 0){
      countDown(that,time);
    }else if(time <= 0){
      that.data.cutting=true;
      that.tuikuan();
      return;
    }
    
  }, 1000);

}

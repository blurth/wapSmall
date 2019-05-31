import { Home } from 'home-model.js';
var home = new Home(); 
Page({
    data: { 
        noticehidden:false,
        loadingHidden: false,
        color:'rgba(0, 0, 0, .3)',
        notice:'',
        dots:true
    },
    onLoad: function () {
        this._loadData();
    },

    _loadData:function(callback){
        var that = this;

        home.getBannerData((data) => {
            that.setData({
                bannerArr: data,
            });
        });

      home.getNoticeData((data) => {
        that.setData({
          noticehidden:true,
          notice: data.notice
        });
      });

        home.getThemeData((data) => {
            that.setData({
                themeArr: data,
                loadingHidden: true
            });
        });

        home.getDiaryData((data) => {
            that.setData({
                diaryArr: data
            });
            callback&&callback();
        });
        home.getPtuanData((data) =>{
            that.setData({
              ptArr: data
            });
            callback&&callback();
        });



    },
    onBannerItemTap: function (event){
      // var id = home.getDataSet(event, 'id');
      // var name = home.getDataSet(event, 'name');
      // if(id == 1){
      //   wx.navigateTo({
      //     url: '../special/special/recent' 
      //   })
      // }
      // wx.navigateTo({
      //   url: '../diary/diary?id=' + id + '&name=' + name
      // })
    },


    onDiaryItemTap:function (event) {
    var id = home.getDataSet(event, 'id');
    var name = home.getDataSet(event, 'name');
    wx.navigateTo({
      url: '../diary/diary?id=' + id + '&name=' + name
    })
  },
    onThemeAItemTap: function (event) {
        var id = home.getDataSet(event, 'id');
        var name = home.getDataSet(event, 'name');

        if(id == 4){
          wx.openLocation({
            latitude: 34.259590,
            longitude: 108.918940,
            scale: 18,
            name: '西安悦华医疗美容门诊部',
            address: '西关正街晨光御苑A座14层'
          })
        } else if (id == 7) {
          wx.navigateTo({
            url: '../sence/sence'
          })
        } else if (id == 2) {
          wx.navigateTo({
            url: '../special/special'
          })
        } else if (id == 5) {

          wx.navigateTo({
            url: '../project/project'
          })
        } else if (id == 6) {

          wx.navigateTo({
            url: '../doctor/doctor'
          })
        } else if (id == 8) {

          // wx.navigateTo({
          //   url: '../translate/translate'
          // })
        }else{
          wx.navigateTo({
            url: '../theme/theme?id=' + id + '&name=' + name
          })
        }
      
    },

  onGoodsItemTap: function (event) {
      var id = home.getDataSet(event,'id');
      wx.navigateTo({
        url: 'goods/goods?id='+id,
      })
    },

    onPullDownRefresh: function(){
        this._loadData(()=>{
            wx.stopPullDownRefresh()
        });
    },
   
    allPt:function(){
      wx.navigateTo({
        url: '../pintuan-list/pintuan-list',
      })
    },
  lingTicket: function () {
    console.log('123');
  },
    onShareAppMessage: function () {
        return {
            title: '西安悦华医疗美容',
            path: 'pages/home/home'
        }
    }

})



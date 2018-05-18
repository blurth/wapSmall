import { Theme } from 'theme-model.js';
var theme = new Theme(); //实例化  主题列表对象
Page({
    data: {
        loadingHidden: true
    },

    onLoad: function (option) {
        this.data.titleName=option.name;
        this.data.id=option.id;
        wx.setNavigationBarTitle({
            title: option.name
        });
        this._loadData();

    },

    /*加载所有数据*/
    _loadData:function(callback){
        var that = this;
        /*获取单品列表信息*/
        theme.getThemesData(this.data.id,(data) => {
            that.setData({
              themeInfo: data.items,
                loadingHidden:true
            });
            callback && callback();
        });
    },

   

    //分享效果
    onShareAppMessage: function () {
        return {
            title: 'this.data.titleName',
            path: 'pages/theme/theme?id=' + this.data.id
        }
    }

})



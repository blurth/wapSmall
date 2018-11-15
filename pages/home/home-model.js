
import {Base} from '../../utils/base.js';

class Home extends Base{
    constructor(){
        super();
    }

    getBannerData(callback){
        var param={
            url: 'banner/1',

            sCallback:function(data){
                data=data.items;
                callback && callback(data);
            }
        };
        this.request(param);
    }

    getThemeData(callback){
        var param={
          url: 'theme?ids=1,2,3,4,5,6,7,8',
            sCallback:function(data){
                callback && callback(data);
            }
        };
        this.request(param);
    }

    getDiaryData(callback){
        var param={
            url: 'diary/recent',
            sCallback:function(data){
                callback && callback(data);
            }
        };
        this.request(param);
    }

    getVideoData(callback) {
      var param = {
        url: 'video',
        sCallback: function (data) {
          callback && callback(data);
        }
      };
      this.request(param);
    }

    allCut(callback) {
      var param = {
        url: 'goods/cutrecent',
        sCallback: function (data) {
          callback && callback(data);
        }
      };
      this.request(param);
    }

  getPtuanData(callback) {
    var param = {
      url: 'goods/ptrecent',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
};

export {Home};
/**
 * Created by jimmy on 17/03/09.
 */

import {Base} from '../../utils/base.js'

class Plist extends Base{

    constructor(){
        super();
    }

    /*获取当前拼团的列表*/
    getAllPtlist(callback){
        var param={
            url: 'goods/allpt',

            sCallback:function(data){
                data=data;
                callback && callback(data);
            }
        };
        this.request(param);
    }

  

}

export {Plist};
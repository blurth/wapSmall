import {Porder} from '../porder/porder-model.js';
import {Cart} from '../cart/cart-model.js';
import {Address} from '../../utils/address.js';
import {Detail} from '../../pages/home/goods/goods-model.js';
var goods = new Detail();
var porder=new Porder();
var cart=new Cart();
var address=new Address();
 
Page({
        data: {
          fromPtFlag:false,
          addressInfo:null
        },

        /*
        * 订单数据来源包括四个：
        * 砍价的订单
        * */
        onLoad: function (options) {
          
            var fromPtFlag = options.from=='pt';
            this.data.account=options.account;

            //来自于拼团
            if (fromPtFlag){
              this.setData({
                Ptaddress:false,
                addressInfo:false,
                productsArr: goods.getPtDataFromLocal(true),
                account:options.account,
                orderStatus:0
              });
            }
            //旧订单
            else{
                this.data.id=options.id;
            }
        },

        onShow:function(){
            if(this.data.id) {
                var that = this;
                //下单后，支付成功或者失败后，点左上角返回时能够更新订单状态 所以放在onshow中
                var id = this.data.id;
                porder.getOrderInfoById(id, (data)=> {
                    that.setData({
                        orderStatus: data.status,

                        productsArr: data.snap_items,
                        account: data.total_price,
                        basicInfo: {
                            orderTime: data.create_time,
                            orderNo: data.order_no
                        },
                    });

                    // 快照地址
                    var addressInfo=data.snap_address;
                    addressInfo.totalDetail = address.setAddressInfo(addressInfo);
                    that._bindAddressInfo(addressInfo);
                });
            }
        },

        /*修改或者添加地址信息*/
        editAddress:function(){
            var that=this;
            wx.chooseAddress({
                success: function (res) {
                    var addressInfo = {
                        name:res.userName,
                        mobile:res.telNumber,
                        totalDetail:address.setAddressInfo(res)
                    };
                    
                    that._bindAddressInfo(addressInfo);
                    
                    //保存地址
                    address.submitAddress(res,(flag)=>{
                        if(!flag) {
                            that.showTips('操作提示','地址信息更新失败！');
                        }
                    });
                }
            })
        },

        /*绑定地址信息*/
        _bindAddressInfo:function(addressInfo){
            this.setData({
                addressInfo: addressInfo
            });
        },

        /*下单和付款*/
        pay:function(){
            wx.removeStorageSync('pt');
            if(!this.data.addressInfo){
                this.showTips('下单提示','请填写您的收货地址');
                return;
            }
            if(this.data.orderStatus==0){
                this._firstTimePay();
            }else{
                this._oneMoresTimePay();
            }
        },

        /*第一次支付*/
        _firstTimePay:function(){
            var orderInfo=[],
                procuctInfo=this.data.productsArr;
                
            for(let i=0;i<procuctInfo.length;i++){
                orderInfo.push({
                    product_id:procuctInfo[i].id,
                    count:procuctInfo[i].counts
                });
            }

            var that=this;
            //支付分两步，第一步是生成订单号，然后根据订单号支付
            porder.doOrder(orderInfo,(data)=>{
                //订单生成成功
                if(data.pass) {
                    //更新订单状态
                    var id=data.order_id;
                    that.data.id=id;
                    that.data.fromCartFlag=false;

                    //开始支付
                    that._execPay(id);
                }else{
                    that._orderFail(data);  // 下单失败
                }
            });
        },


        /*
        * 提示窗口
        * params:
        * title - {string}标题
        * content - {string}内容
        * flag - {bool}是否跳转到 "我的页面"
        */
        showTips:function(title,content,flag){
            wx.showModal({
                title: title,
                content: content,
                showCancel:false,
                success: function(res) {
                    if(flag) {
                        wx.switchTab({
                            url: '/pages/my/my'
                        });
                    }
                }
            });
        },

        /*
        *下单失败
        * params:
        * data - {obj} 订单结果信息
        * */
        _orderFail:function(data){
            var nameArr=[],
                name='',
                str='',
                pArr=data.pStatusArray;
            for(let i=0;i<pArr.length;i++){
                if(!pArr[i].haveStock){
                    name=pArr[i].name;
                    if(name.length>15){
                        name = name.substr(0,12)+'...';
                    }
                    nameArr.push(name);
                    if(nameArr.length>=2){
                        break;
                    }
                }
            }
            str+=nameArr.join('、');
            if(nameArr.length>2){
                str+=' 等';
            }
            str+=' 缺货';
            wx.showModal({
                title: '下单失败',
                content: str,
                showCancel:false,
                success: function(res) {

                }
            });
        },

        /* 再次支付*/
        _oneMoresTimePay:function(){
            this._execPay(this.data.id);
        },
 
        /*
        *开始支付
        * params:
        * id - {int}订单id
        */
        _execPay:function(id){
            var that=this;
            porder.execPay(id,(statusCode)=>{
                if(statusCode!=0){
                    
                    var flag = statusCode == 2;

                    var can = wx.getStorageSync('can_id');

                    
                    if(statusCode == 2){
                        porder.prePtOrder(id,(data)=>{
                            console.log(data);
                        });
                    }

                    
                        //支付成功拼团成功
                        wx.navigateTo({
                          url: '../pay-result/pay-result?id=' + id + '&flag=' + flag + '&from=order'
                        });
                    
                    
                }
            });
        }


    }
)
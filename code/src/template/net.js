/**
 * 网络发送http请求,默认为返回类型为json
 * 
 * url: 必须,其他参数非必须  接口地址
 * data:请求的参数 Object或String
 * successFun(dts):成功返回的回调函数，已自动过滤微信端添加数据,按接口约定,返回成功后的data数据,过滤掉msg和status
 * successErrorFun(msg):成功执行请求,但是服务端认为业务错误,执行其他行为,默认弹出系统提示信息.
 * failFun:接口调用失败的回调函数
 * completeFun:接口调用结束的回调函数（调用成功、失败都会执行）
 * header:object,设置请求的 header , header 中不能设置 Referer
 * method:默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
 * 
 */
function r( url, data, successFun, successErrorFun, failFun, completeFun, header, method ) {
    var reqObj = {};
    reqObj.url = url;
    reqObj.data = data;

    //默认头为json
    reqObj.header = { 'Content-Type': 'application/json' };
    if( header ) {
        //覆盖header
        reqObj.header = header;
    }


    if( method ) {
        reqObj.method = method;
    }
    reqObj.success = function( res ) {
        var returnData = res.data; //将微信端结果过滤,获取服务端返回的原样数据
        var status = returnData.status; //按接口约定,返回status时,才调用成功函数
        //console.log(res);
        //正常执行的业务函数
        if( status == true ) {
            if( successFun ) {
                var dts = returnData.data;
                successFun( dts );//回调，相当于获取到data后直接在回调里面处理赋值数据
            }
        } else if( status == false ) {
            var msg = returnData.msg;
            if( !successErrorFun ) {
                console.log( msg );
            } else {
                successErrorFun( msg );
            }

        } else {
            console.log( "服务端没有按照接口约定格式返回数据" );
        }


    }
    reqObj.fail = function( res ) {
        if( failFun ) {
            failFun( res );
        }
    }
    reqObj.complete = function( res ) {
        if( completeFun ) {
            completeFun( res );
        }
    }


    wx.request( reqObj );
}

module.exports = {
    r: r
}

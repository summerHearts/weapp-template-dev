/**
 * 获取三级联动的三个函数
 * that:   注册页面的this实例 必填
 * p_url:  一级省份url 必填
 * p_data：一级省份参数 选填
 */
const net = require( "net" );//引入request方法
let g_url, g_datd, g_cbSuccess, g_cbSuccessErr, g_cbFail, g_cbComplete, g_header, g_method;


function initCityFun( that, p_url, p_data ) {
    //获取一级省份数据
    console.log(p_url+JSON.stringify(p_data));
    g_cbSuccess = function( res ) {
      that.setData( {
        'city.province': res
      });
    };
    net.r( p_url, p_data, g_cbSuccess, g_cbSuccessErr, g_cbFail, g_cbComplete, g_header, g_method );


    //点击一级picker触发事件并获取市区方法
    var changeProvince = function( e ) {
        that.setData( {
            'city.city': {},
            'city.county': {},
            'city.provinceIndex': e.detail.value,
            'city.cityIndex': 0,
            'city.countyIndex': 0
        });
        var _fcode = that.data.city.province.code[ e.detail.value ];
        if( !_fcode ) {
            _fcode = 0;
        }
        var _cityUrl = e.target.dataset.cityUrl;


        g_url = _cityUrl + _fcode;


        console.log("province:"+g_url);


        g_cbSuccess = function( res ) {
            console.log(res);
            that.setData( {
                'city.city': res
            });
        }
        net.r( g_url, g_datd, g_cbSuccess, g_cbSuccessErr, g_cbFail, g_cbComplete, g_header, g_method );
    };
    that[ "provincePickerChange" ] = changeProvince;


    //点击二级picker触发事件并获取地区方法
    var changeCity = function( e ) {
        that.setData( {
            'city.county': {},
            'city.cityIndex': e.detail.value,
            'city.countyIndex': 0
        });
        var _fcode = that.data.city.city.code[ e.detail.value ];
        if( !_fcode ) {
            _fcode = 0;
        }
        var _countyUrl = e.target.dataset.countyUrl;
        g_url = _countyUrl + _fcode;


        g_cbSuccess = function( res ) {
            that.setData( {
                'city.county': res
            });
        };
        net.r( g_url, g_datd, g_cbSuccess, g_cbSuccessErr, g_cbFail, g_cbComplete, g_header, g_method );
    };
    that[ "cityPickerChange" ] = changeCity;


    //点击三级picker触发事件
    var changeCounty = function( e ) {
        that.setData( {
            'city.countyIndex': e.detail.value
        });
    };
    that["countyPickerChange"]=changeCounty;
}


function getProvinceFun(that, p_url, p_data){
    g_cbSuccess = function( res ) {
      that.setData( {
        'city.province': res
      });
    };
    net.r( p_url, p_data, g_cbSuccess, g_cbSuccessErr, g_cbFail, g_cbComplete, g_header, g_method );
}


module.exports={
    initCityFun: initCityFun,
    getProvinceFun: getProvinceFun
}
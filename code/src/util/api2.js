'use strict';

import {
    Promise
} from '../libs/es6-promise'
import config from '../config'
import LOGIN from '../model/login'



export default {
    Host: config.Host,
    DevHost: config.DevHost,
    Storage: {
        userKey: 'userKey'
    },
    /**
     * 图片请求代理
     * 
     * @param {number} [max=200] 取图片最大的长宽
     * @returns
     */
    imgUrlProxy(max = 200) {
        return `${config.imgUrlProxy}max=${max}&url=`
    },
    /**
     * loading 加载文字
     * 
     * @returns
     */
    LoadingText() {
        return config.LoadingText
    },
    KeyExpired() {
        let vm = this
        return new Promise((resolve, reject) => {
            let url = vm.Host + 'cart/count'
            let key = vm.getVal(vm.Storage.userKey);
            let obj = {
                key: key
            }
            vm._post(url, obj)
                .then(res => {

                    if (!data.Success && data.Message == "您的登录过期") {
                        vm.serveLogin()
                            .then(res => {
                                console.log('重新登陆');
                                console.log(res);
                                resolve(false)
                            })
                    } else {
                        resolve(true)
                    }

                })
        })
    },
    /**
     * 验证是否登陆过期中间件
     * 
     * @param {any} obj
     * @returns
     */
    loginExpired(obj) {
        let vm = this
        return new Promise((resolve, reject) => {
            console.log('进入登陆过期中间件')
            console.log(obj.data)
            let data = obj.data
            if (!data.Success && data.Message == "您的登录过期") {
                vm.serveLogin()
                    .then(res => {
                        console.log('重新登陆');
                        console.log(res);
                        resolve(false)
                    })
            } else {
                resolve(true)
            }
        })

    },
    /**
     * 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
     * 
     * @param {any} page
     */
    navTo(page) {
        wx.navigateTo({
            url: page
        })
    },
    /**
     * 返回上一页
     * 
     * @param {number} [delta=1]
     * @param {number} [time=1000]
     */
    navBack(delta = 1, time = 1000) {

        setTimeout(function () {
            wx.navigateBack({
                delta: delta
            })
        })

    },
    /**
     * 提交成功后返回上一页
     * 
     * @param {string} [title='成功']
     * @param {number} [time=1000]
     */
    submitNavBack(title = '成功', time = 1000) {
        let vm = this
        wx.showToast({
            title: title,
            duration: time
        })
        vm.navBack(title, time)
    },
    /**
     * 消息提示
     * 
     * @param {string} [title='成功']
     * @param {number} [time=1000]
     */
    msg(title = '成功', time = 1000) {
        wx.showToast({
            title: title,
            duration: time
        })
    },
    /**
     * loding 状态
     * 
     * @param {any} string
     */
    loading(bool) {
        let title = bool
        if (bool) {
            title = title.toString()
            wx.showToast({
                title: title,
                icon: 'loading',
                duration: 10000
            })
        } else {
            wx.hideToast()
        }

    },
    /**
     * 发起服务登陆
     * 
     * @returns
     */
    serveLogin() {
        let vm = this
        return new Promise((resolve, reject) => {
            LOGIN.WXLogin()
                .then(res => {
                    console.log(res);
                    LOGIN.Login(res)
                        .then(ress => {
                            console.log(ress.data.Data)
                            vm.saveSync(vm.Storage.userKey, ress.data.Data.Key)
                            resolve(ress)
                        })
                })
        })

    },
    /**
     * 获取 用户认证的 key
     * 
     * @param {any} data
     * @returns
     */
    getUserKey(data) {
        let vm = this
        let url = vm.Host + 'platform/login'
        let obj = {
            LoginType: 10,
            Client: {
                AppKey: config.AppKey,
                FromClient: 'SmallProgram'
            },
            SmallProgram: {
                IV: data.iv,
                EncryptedData: data.encryptedData,
                SmallProgramJsCode: data.code
            }
        }
        return new Promise((resolve, reject) => {
            vm.loginPost(url, obj)
                .then(res => {
                    resolve(res)
                })
        })

    },
    /**
     * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
     * 
     * @param {any} key
     * @param {any} val
     */
    saveSync(key, val) {
        console.log(val, key)
        wx.setStorageSync(key, val)
    },
    /**
     * 从本地缓存中同步获取指定 key 对应的内容。
     * 
     * @param {any} key
     * @returns
     */
    getVal(key) {
        return wx.getStorageSync(key)
    },
    /**
     * 发起第三方登陆请求
     * 
     * @param {any} url
     * @param {any} data
     * @returns
     */
    loginPost(url, data) {
        let vm = this
        let key = this.getVal(this.Storage.userKey)
        data.key = key
        return new Promise((resolve, reject) => {
            vm.loading('登陆中...')
            wx.request({
                url,
                data,
                method: 'POST',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/x-www-form-urlencode;charset=UTF-8;'
                },
                success(res) {
                    console.log('请求ok')
                    // let data = res.data
                    resolve(res)
                },
                complete(res) {
                    vm.loading(false)
                },
                fail(res) {
                    console.log('请求错误了')
                    console.log(res)
                    reject(res)
                }
            })
        })
    },
    /**
     * POST 请求中间件 需要 auth
     * 
     * @param {any} url
     * @param {any} data
     * @returns
     */
    _post(url, data) {
        let vm = this
        let key = vm.getVal(vm.Storage.userKey)
        data.key = key
        return new Promise((resolve, reject) => {
            vm.loading(vm.LoadingText())
            wx.request({
                url,
                data,
                method: 'POST',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/x-www-form-urlencode;charset=UTF-8;'
                },
                success(res) {
                    console.log('请求ok')
                    vm.loginExpired(res)
                        .then(res2 => {
                            console.log('需要 auth 中间件')
                            console.log(res.data)
                            console.log(res2)
                            vm.loading(false)
                            vm.msg(res.data.Message)
                            if (res2) {
                                
                                console.log('请求数据Ok')
                                resolve(res)
                            } else {
                                console.log('进入再次请求数据')
                                vm._post(url, data)
                                    .then(res3 => {
                                       
                                        console.log('再次请求数据OK')
                                        resolve(res3)
                                    })
                            }

                        })
                },
                complete(res) {

                },
                fail(res) {

                    console.log('请求错误了')
                    console.log(res)
                    reject(res)
                }
            })
        })
    },
    /**
     * get 请求中间件
     * 
     * @param {any} url
     * @param {any} data
     * @returns
     */
    _get(url, data) {
        let vm = this
        return new Promise((resolve, reject) => {
            console.log(url)
            vm.loading(vm.LoadingText())
            wx.request({
                url,
                headers: {
                    'Content-Type': 'application/json'
                },
                success(res) {
                    vm.loading(false)
                    resolve(res)
                },
                fail(res) {
                    vm.loading(false)
                    reject(res)
                }
            })
        })
    },
    /**
     * 支付请求
     * 
     * @param {any} data
     * @returns
     */
    payment(data) {
        let vm = this
        return new Promise((resolve, reject) => {
            wx.requestPayment({
                timeStamp: '',
                nonceStr: '',
                package: '',
                signType: 'MD5',
                paySign: '',
                success(res) {
                    resolve(res)
                },
                fail(res) {
                    resolve(res)
                }
            })

        })
    },
    /**
     * 抓取商品信息
     * 
     * @param {any} url
     * @returns
     */
    Crawl(url) {
        let vm = this

        return new Promise((resolve, reject) => {

        })

    },
    /**
     * 添加购物车
     * 
     * @param {any} GrabAttr
     * @returns
     */
    addCart(GrabAttr) {
        let vm = this
        let url = vm.Host + 'cart/modify'
        let obj = {
            GrabAttr: GrabAttr,
        }
        return new Promise((resolve, reject) => {
            console.log('添加购物')
            vm._post(url, obj)
                .then(res => {
                    resolve(res)
                })
        })
    },
    /**
     * 获取顶级域名
     * 
     * @param {any} url
     * @returns
     */
    topDomain(url) {
        let re = /([^.]+\.)?([^\.]+\..+)/
        let str = url;

        let m = str.match(re)

        if (m.length > 2) {
            console.log('m[2]')
            console.log(m[2].split("/")[0])
            return m[2].split("/")[0]
        } else {
            console.log(m[1])
        }
    },
    /**
     * 货币昵称转换
     * 
     * @param {any} CurrencyCode
     * @returns
     */
    trans(CurrencyCode) {
        let obj = {
            JPY: '日元',
            EUR: '欧元',
            USD: '美元',
            GBP: '英镑'
        }

        return obj[CurrencyCode]
    },
    /**
     * 保留2位小数
     * 
     * @param {any} number
     * @returns
     */
    formatPrice(number) {
        let price = Number(number)
        return price.toFixed(2)
    },
    /**
     * 获取元素的 data 私有属性
     * 
     * @param {any} event
     * @param {any} key
     * @returns
     */
    event(event, key) {
        return event.currentTarget.dataset[key]
    },
    _isNone(s) {
        return s == '' || s == null || s == undefined;
    }
}
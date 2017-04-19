'use strict';

import {
    Promise
} from '../libs/es6-promise'
import config from '../config'
import LOGIN from '../model/login'



export default {
    Host: config.Host,
    DevHost: config.DevHost,
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
            }, time)
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
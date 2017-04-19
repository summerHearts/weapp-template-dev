'use strict';

import {
    Promise
} from '../libs/es6-promise'
import config from '../config'

export default {
    userKey: 'userKey',
    cart: 'cart',
    ShipComapnyId:'ShipComapnyId', //转运公司Id
    address:'address',
    packages:'packages',
    packageBox:'packageBox', //包裹合箱
    /**
     * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容， 内置 Promise 对象
     * 
     * @param {any} key
     * @param {any} val
     * @returns
     */
    set(key, val) {
        return new Promise((resolve, reject) => {
            wx.setStorage({
                key: key,
                data: val,
                success(res) {
                    console.log('storage set ok')
                    console.log(res)
                    resolve(res)
                },
                complete(res) {
                    // 不管什么返回状态都会执行
                },
                fail(res) {
                    console.log('storage set error')
                    console.log(res)
                    reject(res)
                }
            })
        })
    },
    /**
     * 从本地缓存中异步获取指定 key 对应的内容。 内置 Promise 对象
     * 
     * @param {any} key
     * @returns
     */
    get(key){
        return new Promise((resolve, reject) => {
            wx.getStorage({
                key: key,
                success(res) {
                    console.log('storage get ok')
                    console.log(res)
                    resolve(res.data)
                },
                complete(res) {
                    // 不管什么返回状态都会执行
                },
                fail(res) {
                    console.log('storage get error')
                    console.log(res)
                    resolve(res)
                }
            })
        })

    },
    /**
     * 从本地缓存中异步移除指定 key 。
     * 
     * @param {any} key
     * @returns
     */
    remove(key){
        return new Promise((resolve, reject) => {
            wx.removeStorage({
                key: key,
                success(res) {
                    console.log('storage get ok')
                    console.log(res)
                    resolve(res.data)
                },
                complete(res) {
                    // 不管什么返回状态都会执行
                },
                fail(res) {
                    console.log('storage get error')
                    console.log(res)
                    reject(res)
                }
            })
        })
    }
}



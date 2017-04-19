'use strict';

import {
    Promise
} from '../libs/es6-promise'
import storage from './storage'
import _MSG from '../mwx/msg'

const REQ_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

const HEADER = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencode;charset=UTF-8;'
}



export default {
    /**
     * 发起 POST 请求
     * 
     * @param {any} url
     * @param {any} data
     * @returns
     */
    post(url, data) {
        let vm = this

        return new Promise((resolve, reject) => {
            _MSG.loading('加载中...')

            let key = wx.getStorageSync(storage.userKey)
            data.key = key
            wx.request({
                url: url,
                data: data,
                header: HEADER,
                method: REQ_METHOD.POST,
                success(res) {
                    let resData = res.data
                    resolve(resData)
                },
                fail: res => reject(res),
                complete: res => {
                    _MSG.loading(false)
                    if (res.data.Message) {
                        console.log(res.data.Message)
                        _MSG.title(res.data.Message)
                    }

                },
            })
        })
    }
}
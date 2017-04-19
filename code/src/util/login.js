/**
 * api 数据接口模型
 * login 用户登陆
 */
import {
    Promise
} from '../libs/es6-promise';
import api from '../util/api';

export default {
    /**
     * 用户登陆获取密钥
     * 
     * @api {post} platform/login 用户登陆
     * @apiName platform
     * @apiGroup login
     * 
     * @请求参数
     * @apiParam {String} key 认证密钥.
     * 
     * @服务接口返回字段
     * @apiSuccess {Number} Total  等待.
     * @apiSuccess {Number} TotalPage  等待.
     * @apiSuccess {Boolean} Success  状态.
     * @apiSuccess {Number} Code  状态码.
     * @apiSuccess {String} Message  状态提示信息.
     * 
     * @apiSampleRequest https://api.6city.com/platform/login
     * 
     * @param {string} [dataObj = {}]
     * @returns
     */
    Platform(dataObj = {}) {
        return new Promise((resolve, reject) => {
            let url = api.Host + 'platform/login'

            let obj = dataObj
            api._post(url, obj)
                .then(res => {
                    console.log('登陆')
                    console.log(res.data)
                    let data = res.data
                    resolve(data)
                })
        })
    },

}
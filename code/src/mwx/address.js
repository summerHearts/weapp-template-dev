/**
 * 微信接口模型
 * 地理位置
 */
import {
    Promise
} from '../libs/es6-promise'
import api from '../util/api'

export default {
    /**
     * 获取当前的地理位置、速度
     * 
     * @服务接口返回字段
     * @apiSuccess {Number} latitude  纬度，浮点数，范围为-90~90，负数表示南纬.
     * @apiSuccess {Number} longitude  经度，浮点数，范围为-180~180，负数表示西经.
     * @apiSuccess {Number} speed  速度，浮点数，单位m/s.
     * @apiSuccess {Number} accuracy  位置的精确度.
     * 
     * @param {string} [type='wgs84'] wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标
     * @returns
     */
    getLocation(type = 'wgs84') {
        return new Promise((resolve, reject) => {
            wx.getLocation({
                type: 'wgs84',
                success: function (res) {
                    resolve(res)
                }
            })

        })
    },
    /**
     * 打开地图选择位置
     * 
     * @服务接口返回字段
     * @apiSuccess {String} name  位置名称.
     * @apiSuccess {String} address  详细地址.
     * @apiSuccess {Number} latitude  纬度，浮点数，范围为-90~90，负数表示南纬.
     * @apiSuccess {Number} longitude  经度，浮点数，范围为-180~180，负数表示西经.
     * 
     * @returns
     */
    chooseLocation() {
        return new Promise((resolve, reject) => {
            wx.chooseLocation({
                success (res) {
                    resolve(res)
                },
                cancel(res){
                   resolve(false) 
                }
            })

        })
    },
    /**
     * 使用微信内置地图查看位置
     * 
     * @param {Float} latitude 纬度，范围为-90~90，负数表示南纬
     * @param {Float} longitude 经度，范围为-180~180，负数表示西经
     * @returns
     */
    openLocation(latitude,longitude) {
        return new Promise((resolve, reject) => {
            wx.openLocation({
                latitude: latitude,
                longitude: longitude,
                scale: 28,
                success: function (res) {
                    resolve(res)
                }
            })

        })
    }

}
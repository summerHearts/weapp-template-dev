/**
 * 微信接口模型
 * 图片操作
 */
import {
    Promise
} from '../libs/es6-promise'
import api from '../util/api'

export default {
    /**
     * 从本地相册选择图片或使用相机拍照。
     * 
     * @服务接口返回字段
     * @apiSuccess {string} tempFilePaths  本地文件路径
     * 
     * @param {string} 
     * @returns
     */
    chooseImage() {
        return new Promise((resolve, reject) => {
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    let tempFilePaths = res.tempFilePaths
                    resolve(res)
                }
            })

        })
    },

}
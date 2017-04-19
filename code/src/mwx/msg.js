'use strict';

export default {
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
     * 消息提示
     * 
     * @param {string} [title='成功']
     * @param {number} [time=1000]
     */
    title(title = '成功', time = 1000) {
        wx.showToast({
            title: title,
            duration: time
        })
    },

}
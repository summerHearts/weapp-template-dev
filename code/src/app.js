'use strict';
//app.js
App({
  /**
   * 生命周期函数--监听小程序初始化
   * 
   * @returns
   */
  onLaunch() {
    //调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    return '当小程序初始化完成时，会触发 onLaunch（全局只触发一次）'
  },
   /**
   * 生命周期函数--监听小程序显示
   * 
   * @returns
   */
  onShow () {
      // Do something when show.

      return '当小程序启动，或从后台进入前台显示，会触发 onShow'
  },
  /**
   * 生命周期函数--监听小程序隐藏
   * 
   * @returns
   */
  onHide() {
      // Do something when hide.
      return '当小程序从前台进入后台，会触发 onHide'
  },
  /**
   * 获取微信小程序自身登陆用户信息
   * 
   * @param {any} cb
   */
  getUserInfo(cb) {
    const that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success(code) {
          wx.getUserInfo({
            success(res) {
              let userInfo = res.userInfo
              userInfo.login = code
              that.globalData.userInfo = userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  /**
   * 获取系统信息。
   * 
   * @param {any} cb
   */
  getSystemInfo(cb) {
    const that = this;
    if(that.globalData.systemInfo){
      typeof cb == "function" && cb(that.globalData.systemInfo)
    }else{
      wx.getSystemInfo({
        success(res) {
          that.globalData.systemInfo = res
          typeof cb == "function" && cb(that.globalData.systemInfo)
        }
      })
    }
  },
 
  /**
   * 错误监听函数
   * 
   * @param {any} msg
   * @returns
   */
  onError(msg) {
    console.log(msg)
    return '当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息'
  },
  globalData:{
    userCode: null,
    userInfo: null,
    systemInfo: null
  }
})
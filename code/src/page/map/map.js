'use strict';

import regeneratorRuntime from '../../libs/runtime'
import co from '../../libs/co'
import api from '../../util/api'
import storage from '../../util/storage'
import abCart from '../../abprocess/cart'
import modelOrder from '../../model/order'
import modelPayment from '../../model/payment'
import da from '../../util/da'

Page({
  data: {
    orderid: 0,
    Phone: '15000003499',
    detail: {}
  },
  init() {
    let vm = this
    let orderid = vm.data.orderid
    co(function* () {
      let detail = yield modelOrder.Detail(orderid)

      vm.setData({
        detail: detail
      })
      console.log(detail)
    })

  },
  onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    let vm = this
    let orderid = options.orderid
    vm.setData({
      orderid: orderid
    })

    this.init()
  },
  onReady() {

  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面关闭
  },
  submit() {
    let vm = this;
    let data = vm.data
    let detail = data.detail

    co(function* () {

      let obj = {
        BusinessId: detail.Id,
        BusinessNo: detail.OrderNo,
        BusinessType: 'order',
        PaymentType: 20,
        TotalAmount: detail.TotalAmount
      }

      let paymentInfo = yield modelPayment.Info(obj)

      console.log(paymentInfo)
    })
  }
})
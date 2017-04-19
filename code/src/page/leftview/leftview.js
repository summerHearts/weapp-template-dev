Page({
  data: {
    marginLeft: 0,//
    pageX: 0,//初始位置记录
    pageY: 0,//记录Y轴的位置
    animation: {},
    isMoveRight: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.getSystemInfo({
      success: function (res) {

      }
    })

  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示
    var animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease',
    })

    this.animation = animation
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  start: function (e) {
    var pageX = e.touches[0].clientX;//记录触摸位置X方向
    var pageY = e.touches[0].clientY;//记录触摸位置Y方向
    var marginLeft = this.data.marginLeft;

    if (Math.abs(marginLeft) == 100) {//点击回到原点
      this.animation.translate(100).step({ duration: 800 });
      this.setData({
        animation: this.animation.export(),
      })
      var that = this;
      setTimeout(function () {
        that.setData({
          marginLeft: 0
        })
      }, 800)
      return;
    }

    this.setData({
      pageX: pageX,
      pageY: pageY
    })
    console.log(pageX);
  },
  move: function (e) {
    var pageX = this.data.pageX;
    var pageY = this.data.pageY;
    var marginLeft = this.data.marginLeft;
    var moveX = e.changedTouches[0].clientX - pageX;//记录当前移动的X轴
    var moveY = e.changedTouches[0].clientY - pageY;//记录当前移动Y轴

    if (moveX > 0) {
      this.setData({
        marginLeft: 0,
      })
      return;
    }

    if (Math.abs(marginLeft) >= 90) {//为了快速拖动不出现空白区域
      this.setData({
        marginLeft: -100,
        isMoveRight: true
      })
      return;
    }


    console.log(moveX)
    var isMoveRight = false;
    if (Math.abs(moveX) > Math.abs(moveY) && Math.abs(moveX) > 0) { //判断是左向右滑动
      //当marginLfet最大值时才可以向右滑动,且moveX=所设置的最大值
      if (Math.abs(marginLeft) >= 100) {
        moveX = -100; //因为是左滑动 所以是负
        isMoveRight = true;
      } 

      this.setData({
        marginLeft: moveX,
        isMoveRight: isMoveRight
      })
    }
  },
  end: function (e) {
    var marginLeft = this.data.marginLeft;
    var isMoveRight = this.data.isMoveRight;
    var that = this;
    if (!isMoveRight) {
      if (Math.abs(marginLeft) > 50) {//超过一半时，自动到滑动到最大
        var tx = 100 - Math.abs(marginLeft);
        that.animation.translate(-tx).step({ duration: 500 });
        that.setData({
          animation: that.animation.export(),
        })
        setTimeout(function () {
          that.setData({
            marginLeft: -100,
            isMoveRight: true
          })
        }, 500)
      } else { //没有一半时，自动滑动到0

        that.animation.translate(Math.abs(marginLeft)).step({ duration: 500 });
        that.setData({
          animation: that.animation.export(),
        })
        setTimeout(function () {
          that.setData({
            marginLeft: 0,
            isMoveRight: false
          })
        }, 500)
      }
    }
  }

})
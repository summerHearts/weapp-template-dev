Page({
  data: {
    front__lists:[
      
    ],
    lists:[
      {
        sendUserId:10,
        name:"222"
      },
    ],
    text: "Page hua"
  },
  //关闭所有列表的的active
  closeLeftActive: function (sendUserId) {
    var front__lists = this.data.front__lists,
      lists = this.data.lists,
      result;
    const fllen = front__lists.length,
      llen = lists.length;
    for (var i = 0; i < fllen; i++) {
      front__lists[i]['isMoveLeft'] = false;
      front__lists[i]['moveLeftX'] = 0;
      if (sendUserId && sendUserId == front__lists[i]['sendUserId']) {
        this.touchElement = {
          t: 'front__lists',
          i: i
        }
      }
    }
    for (var i = 0; i < llen; i++) {
      lists[i]['isMoveLeft'] = false;
      lists[i]['moveLeftX'] = 0;
      if (sendUserId && sendUserId == lists[i]['sendUserId']) {
        this.touchElement = {
          t: 'lists',
          i: i
        }
      }
    }
    this.setData({
      front__lists: front__lists,
      lists: lists
    });
  },
  moveX: 0, //全局点击按下时的X坐标
  touchElement: {}, //当前点击的列表元素
  isRedirect: true, //是否松开时跳转，默认如果滑动未超过10像素，跳转至详情页
  //点击按下时
  listtouchStart: function (e) {
    this.moveX = e.changedTouches[0].clientX; //获取当前点击按下时的的X坐标
    const senduserid = e.currentTarget.dataset.senduserid; //获取当前列表元素的ID
    this.closeLeftActive(senduserid); //关闭所有元素的滑动样式，并且获取到当前点击的元素在this.data中的位置
    this.isRedirect = true; //点击默认改成能跳转
  },
  //点击移动时
  listtouchMove: function (e) {
    const moveX = e.changedTouches[0].clientX; //获取移动到新位置时的坐标
    var mx = this.moveX - moveX; //计算得到与按下时的X坐标移动多少像素
    if (mx > 10) { //如果像素大于10像素
      this.isRedirect = false; //则不跳转       
      /**将新的位置赋值到全局data渲染页面， */
      this.setData((function (ele, val, bool) {
        var obj = {};
        obj[ele + 'moveLeftX'] = val; //左移的值
        obj[ele + 'isMoveLeft'] = bool; //控制是否超过40像素，则直接添加active样式类
        return obj;
      })(this.touchElement.t + '[' + this.touchElement.i + ']', mx, (mx >= 40)));
    } else if (mx < 0) { //如果是右滑，也不跳转
      this.isRedirect = false;
    }
  },
  //点击松开时
  listtouchEnd: function (e) {
    if (this.isRedirect) { //如果能跳转则跳转至新的详情页面
      const senduserid = e.currentTarget.dataset.senduserid; //获取参数
      wx.navigateTo({
        url: 'dialog?sendUserId=' + senduserid
      });
      this.closeLeftActive(); //初始化关闭所有打开的滑动效果
      return;
    }
    const moveX = e.changedTouches[0].clientX;
    var mx = this.moveX - moveX;
    if (mx < 40) { //如果松开时位移小于40像素则回弹关闭
      this.closeLeftActive();
    }
  },
  //点击被取消时，如中途来电话了等，初始化关闭所有打开的滑动效果
  listtouchcancel: function (e) {
    this.closeLeftActive();
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
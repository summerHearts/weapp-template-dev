//index.js
//获取应用实例
var app = getApp();

var glaDraw = {
    startX:0,
    startY:0,
    endX:0,
    endY:0,
    key:0,
    maxRight:60,
}


Page({
    data: {
        cardTeams: [{
            "id": "aaaaa",
            "name": "android",
            "url": "http://www.see-source.com",
            "right": 0,
            "startRight": 0
        }, {
            "id": "bbbb",
            "name": "小程序",
            "url": "http://www.see-source.com",
            "right": 0,
            "startRight": 0
        }]
    },
    saveData(obj){
        this.setData(obj);
    },
    drawStart: function (e) {
        var touch = e.touches[0];
        glaDraw.startX = touch.clientX;
        glaDraw.startY = touch.clientY;
        glaDraw.key = true;
    },

    drawMove: function (e) {
        //console.log("drawMove");
        var self = this;
        var dataId = e.currentTarget.id;
        var _index = e.currentTarget.dataset.id;
        var _Pindex = e.currentTarget.dataset.pid;

        console.log('_index')
        console.log(_index)
        console.log(_Pindex)
        var cardTeams = this.data.cardTeams;
        if (!glaDraw.key) {
            return
        }

        var touch = e.touches[0];
        glaDraw.endX = touch.clientX;
        glaDraw.endY = touch.clientY;
        console.log("startX=" + glaDraw.startX + " endX=" + glaDraw.endX);
        if (glaDraw.endX - glaDraw.startX == 0)
            return;
        var res = cardTeams;
        //从右往左
        let item = cardTeams[_index]
        if ((glaDraw.endX - glaDraw.startX) < 0) {
            var startRight = item.startRight;
            var change = glaDraw.startX - glaDraw.endX;
            startRight += change;
            if (startRight > glaDraw.maxRight)
                startRight = glaDraw.maxRight;
            item.right = startRight;

        } else { //从左往右
            var startRight = item.startRight;
            var change = glaDraw.endX - glaDraw.startX;
            startRight -= change;
            if (startRight < 0)
                startRight = 0;
            item.right = startRight;

        }
        self.saveData({
            cardTeams: res
        });

    },
    drawEnd: function (e) {
        console.log("drawEnd");
        var cardTeams = this.data.cardTeams;
        for (var i in cardTeams) {
            var data = cardTeams[i];
            if (data.right <= 100 / 2) {
                data.right = 0;
            } else {
                data.right = glaDraw.maxRight;
            }
        }
        this.saveData({
            cardTeams: cardTeams
        });
    },
    //删除item
    delItem: function (e) {
        var dataId = e.target.dataset.id;
        console.log(e)
        console.log("删除" + dataId);
        var cardTeams = this.data.cardTeams;
        var newCardTeams = [];
        for (var i in cardTeams) {
            var item = cardTeams[i];
            if (item.id != dataId) {
                newCardTeams.push(item);
            }
        }
        this.saveData({
            cardTeams: newCardTeams
        });
    },
    onLoad: function () {
        console.log('onLoad:' + app.globalData.domain)

    }
})
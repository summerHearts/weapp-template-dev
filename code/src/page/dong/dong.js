//index.js
//获取应用实例
var app = getApp();
var cardTeams;
var startX;
var startY;
var endX;
var endY;
var key;
var maxRight = 60;
let list;
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
        }],
        list: [{
            "GrabAttrs": [{
                "CountryId": 2,
                "WebSiteId": 9,
                "StoreLogo": "http://www.sxdaily.com.cn/NMediaFile/2013/1127/SXRB201311271600000299036564186.jpg",
                "StoreName": "美国亚马逊",
                "StoreUrl": "http://www.amazon.com",
                "Cover": "https://images-na.ssl-images-amazon.com/images/I/41FYkVPzrIL.jpg",
                "Url": "http://www.amazon.com/dp/B00TSUGXKE%3fpsc%3d1%26SubscriptionId%3dAKIAIFD7CB…nkCode%3dxm2%26camp%3d2025%26creative%3d165953%26creativeASIN%3dB00TSUGXKE",
                "Brand": "",
                "CId": "",
                "OriginalUrl": "",
                "RebateUrl": "",
                "Name": "Fire",
                "Pictures": "https://images-na.ssl-images-amazon.com/images/I/41FYkVPzrIL.jpg",
                "Quantity": 1,
                "Sku": "DigitalStorageCapacity:16 GB,Color:Magenta,Configuration:With Special Offers",
                "SkuId": "B018Y224PY",
                "ExpressFee": 0,
                "Height": 0,
                "Weight": 0,
                "Width": 0,
                "Length": 0,
                "UnitPrice": 69.99,
                "OriginalCurrencyCode": "USD",
                "OriginalCurrencySign": "$",
                "OriginalPrice": 69.99,
                "Note": "",
                "AttributeDescription": "",
                "ReplenishmentStatus": 0,
                "ProductStauts": 1,
                "CurrencyCode": "",
                "CurrencySign": "",
                "GrabAttributeNo": "421482845652276756",
                "Price": 0,
                "IsBuy": true,
                "Coupon": "",
                "Id": 72612,
                "CreateTime": "2016-12-27 13:34:12",
                "UpdateTime": "2016-12-27 13:34:12",
                "status": true,
                "right": 0,
                "startRight": 0
            }, {
                "CountryId": 2,
                "WebSiteId": 9,
                "StoreLogo": "http://www.sxdaily.com.cn/NMediaFile/2013/1127/SXRB201311271600000299036564186.jpg",
                "StoreName": "美国亚马逊",
                "StoreUrl": "http://www.amazon.com",
                "Cover": "https://images-na.ssl-images-amazon.com/images/I/61AMACmVDOL._SX466_.jpg",
                "Url": "https://www.amazon.com/dp/B01LBQ6NRU",
                "Brand": "",
                "CId": "",
                "OriginalUrl": "",
                "RebateUrl": "",
                "Name": "Pop-Tarts Dash Button",
                "Pictures": "https://images-na.ssl-images-amazon.com/images/I/61AMACmVDOL._SX466_.jpg",
                "Quantity": 1,
                "Sku": "",
                "SkuId": "B00ZV9PXP2",
                "ExpressFee": 0,
                "Height": 0,
                "Weight": 0,
                "Width": 0,
                "Length": 0,
                "UnitPrice": 4.99,
                "OriginalCurrencyCode": "USD",
                "OriginalCurrencySign": "$",
                "OriginalPrice": 4.99,
                "Note": "",
                "AttributeDescription": "",
                "ReplenishmentStatus": 0,
                "ProductStauts": 1,
                "CurrencyCode": "",
                "CurrencySign": "",
                "GrabAttributeNo": "491482349785470693",
                "Price": 0,
                "IsBuy": true,
                "Coupon": "",
                "Id": 62636,
                "CreateTime": "2016-12-21 19:49:45",
                "UpdateTime": "2016-12-21 19:49:45",
                "status": true,
                "right": 0,
                "startRight": 0
            }, {
                "CountryId": 2,
                "WebSiteId": 9,
                "StoreLogo": "http://www.sxdaily.com.cn/NMediaFile/2013/1127/SXRB201311271600000299036564186.jpg",
                "StoreName": "美国亚马逊",
                "StoreUrl": "http://www.amazon.com",
                "Cover": "http://ec4.images-amazon.com/images/P/B00ZV9PXP2.01.MAIN._SCRM_.jpg",
                "Url": "http://www.amazon.com/dp/B00ZV9PXP2",
                "Brand": "",
                "CId": "",
                "OriginalUrl": "",
                "RebateUrl": "",
                "Name": "All-New Kindle E-reader - Black,  Glare-Free Touchscreen Display, Wi-Fi",
                "Pictures": "http://ec4.images-amazon.com/images/P/B00ZV9PXP2.01.MAIN._SCRM_.jpg",
                "Quantity": 10,
                "Sku": "Color:Black,Configuration:With Special Offers",
                "SkuId": "B00ZV9PXP2",
                "ExpressFee": 0,
                "Height": 0,
                "Weight": 0,
                "Width": 0,
                "Length": 0,
                "UnitPrice": 79.99,
                "OriginalCurrencyCode": "USD",
                "OriginalCurrencySign": "$",
                "OriginalPrice": 79.99,
                "Note": "",
                "AttributeDescription": "",
                "ReplenishmentStatus": 0,
                "ProductStauts": 1,
                "CurrencyCode": "",
                "CurrencySign": "",
                "GrabAttributeNo": "351482347607806689",
                "Price": 0,
                "IsBuy": true,
                "Coupon": "",
                "Id": 62635,
                "CreateTime": "2016-12-21 19:13:27",
                "UpdateTime": "2016-12-26 19:45:13",
                "status": true,
                "right": 0,
                "startRight": 0
            }],
            "Rule": {
                "ExpensesType": 200,
                "LimitPrice": 0,
                "ExpensesPrice": 0,
                "CurrencySign": "$",
                "CurrencyCode": "USD"
            },
            "StoreUrl": "http://www.amazon.com",
            "Title": "amazon.com-美国亚马逊"
        }]
    },
    drawStart: function (e) {
        // console.log("drawStart");
        var touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        var cardTeams = this.data.cardTeams;
        for (var i in cardTeams) {
            var data = cardTeams[i];
            data.startRight = data.right;
        }
        key = true;
    },
    drawEnd: function (e) {
        console.log("drawEnd");
        var cardTeams = this.data.cardTeams;
        for (var i in cardTeams) {
            var data = cardTeams[i];
            if (data.right <= 100 / 2) {
                data.right = 0;
            } else {
                data.right = maxRight;
            }
        }
        this.setData({
            cardTeams: cardTeams
        });
    },
    drawMove: function (e) {
        //console.log("drawMove");
        var self = this;
        var dataId = e.currentTarget.id;
        var cardTeams = this.data.cardTeams;
        if (key) {
            var touch = e.touches[0];
            endX = touch.clientX;
            endY = touch.clientY;
            console.log("startX=" + startX + " endX=" + endX);
            if (endX - startX == 0)
                return;
            var res = cardTeams;
            //从右往左

            if ((endX - startX) < 0) {
                for (var k in res) {
                    var data = res[k];
                    if (res[k].id == dataId) {
                        var startRight = res[k].startRight;
                        var change = startX - endX;
                        startRight += change;
                        if (startRight > maxRight)
                            startRight = maxRight;
                        res[k].right = startRight;
                    }
                }
            } else { //从左往右
                for (var k in res) {
                    var data = res[k];
                    if (res[k].id == dataId) {
                        var startRight = res[k].startRight;
                        var change = endX - startX;
                        startRight -= change;
                        if (startRight < 0)
                            startRight = 0;
                        res[k].right = startRight;
                    }
                }
            }
            self.setData({
                cardTeams: cardTeams
            });

        }
    },
    //删除item
    delItem: function (e) {
        var dataId = e.target.dataset.id;
        console.log("删除" + dataId);
        var cardTeams = this.data.cardTeams;
        var newCardTeams = [];
        for (var i in cardTeams) {
            var item = cardTeams[i];
            if (item.id != dataId) {
                newCardTeams.push(item);
            }
        }
        this.setData({
            cardTeams: newCardTeams
        });
    },
    onLoad: function () {
        console.log('onLoad:' + app.globalData.domain)

    }
})
'use strict';
// js 工具集

export default {
    /**
     * 数据对象深拷贝
     * 
     * @param {any} arrObj
     * @returns
     */
    deepCopy(arrObj) {
        let vm = this
        if (arrObj instanceof Array) {
            let n = [];
            for (var i = 0; i < arrObj.length; ++i) {
                n[i] = vm.deepCopy(arrObj[i]);
            }
            return n;

        } else if (arrObj instanceof Object) {
            let n = {}
            for (var i in arrObj) {
                n[i] = vm.deepCopy(arrObj[i]);
            }
            return n;
        } else {
            return arrObj;
        }
    },
    /**
     * 过滤重复数组
     * 
     * @param {any} arr
     * @returns
     */
    unique(arr) {
        let result = [],
            hash = {};
        for (var i = 0, elem;
            (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result;
    },
    /**
     * 验证 URL
     * 
     * @param {any} URL
     * @returns
     */
    checkURL(URL) {
        let str = URL
        //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
        //下面的代码中应用了转义字符"\"输出一个字符"/"
        let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
        let objExp = new RegExp(Expression)
        if (objExp.test(str) == true) {
            return true
        } else {
            return false
        }
    },
    /**
     * 验证手机号
     * 
     * @param {any} tel
     * @returns
     */
    checkPhone(tel){
        let reg = /^(13\d|14[57]|15[^4\D]|17[0135-8]|18\d)\d{8}$/
        let phone = tel.toString().replace(/(^\s*)|(\s*$)/g, "")
        return reg.test(phone)
    },
    /**
     * 取整进一
     * 
     * @param {any} v
     * @returns
     */
    modFoat(v) {
        let _max = parseInt(v) + 1
        if (_max - v < 1) {
            return _max
        }
        return v
    }
}
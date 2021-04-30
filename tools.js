// 对象转url参数
function objToQuery(obj) {
    let arr = [];
    for (let k in obj) {
        let str = k + '=' + obj[k];
        arr.push(str);
    }
    return arr.join('&')
}

/**
 * 防止计算丢失精度（乘法）
 * @param arg1 {string|number}
 * @param arg2 {string|number}
 * @returns {number}
 */
const accMul = function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

//获取一级域名domain
function cookieDomain() {
    var hostArr, e, domainString
    try {
        hostArr = window.location.hostname.split(".")
        domainString = 0 <= (e = hostArr[hostArr.length - 1]) && 255 >= e ? [window.location.hostname] : "." + hostArr.slice(-2).join(".")
    } catch (r) {
        domainString = [window.location.hostname]
    }
    return domainString
}

/** 设置cookie
 * @param json {json} json 键值对
 * @param exdays {number} 结束时间 (小时)
 * @param completeDomain 是否是二级域名
 * */
const setCookie = function (json, exdays, completeDomain) {
    if (json) {
        for (let k in json) {
            var cookieString = k + "=" + json[k];
            //判断是否设置过期时间
            if (exdays > 0 && exdays) {
                var d = new Date();
                d.setTime(d.getTime() + exdays * 1000 * 60 * 60); //天 *1000 * 60 * 60 * 24
                cookieString = cookieString + "; expires=" + d.toGMTString();
            }
            //设置domain
            if (!completeDomain) cookieString += "; domain=" + cookieDomain()
            cookieString += ";path=/"
            document.cookie = cookieString;
        }
    }
}

/**
 * 获取cookie
 * @param  {string} key     想要获取的cookie的键
 * @return {string}        想要获取的cookie的值
 */
const getCookie = function (key) {
    let arr = document.cookie.split(";");
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i].trim());
    }
    for (let i = 0; i < newArr.length; i++) {
        let keyAndValueArr = newArr[i].split("=");
        if (keyAndValueArr[0] == key) {
            return keyAndValueArr[1];
        }
    }

}

/**
 * 删除指定cookie
 * @param key {string} cookie捡
 * @param [domain] {string} 删除的cookie的domain
 */
const deleteCookie = function (key, domain) {
    if (!key) {
        throw new Error('键名不能为空')
    }
    let date = new Date();
    let deleteCookieStr = ""
    date.setTime(date.getTime() - 10000);
    deleteCookieStr = key + "=" + getCookie(key) + "; expires=" + date.toGMTString() + ";path=/"
    if (domain) deleteCookieStr += ";domain=" + domain
    document.cookie = deleteCookieStr
}
/**
 * 指定年数
 * @param years {number} 写年数
 * @param [time] {number|string} 从哪年开始加，不写默认现在时间
 * @returns {string} 返回多多少年
 */
const addYear = function (years, time) {
    if (!years) {
        throw new Error('请输入增加年数')
    }
    let d;
    if (!time) {
        d = new Date()
    } else {
        d = new Date(time)
    }
    let y = d.getFullYear();
    let m = d.getMonth() + 1;
    let nowDay = d.getDate();
    y += years;
    m = m.toString().length < 2 ? '0' + m : m;
    nowDay = nowDay.toString().length < 2 ? '0' + nowDay : nowDay;
    return y + '-' + m + '-' + nowDay
};

/**
 * 增加天数
 * @param [days=0] {number} 指定天数
 * @param [time] {number|string} 指定天数
 * @returns {string}
 */
const addDay = function (days = 0, time) {
    let date;
    if (!time) {
        date = new Date()
    } else {
        date = new Date(time)
    }
    let year, month, day;
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    month = month > 9 ? month : '0' + month;
    day = day > 9 ? day : '0' + day;
    return `${year}-${month}-${day}`;
}

/**
 * 图片压缩，默认同比例压缩
 * @param {string} path
 *   pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
 * @param {function} callback
 *   回调函数有一个参数，base64的字符串数据
 */
const dealImage = function (path, callback) {
    let img = new Image();
    img.src = path;
    img.onload = function () {
        //this为img对象
        let that = this;
        // 默认按比例压缩
        let w = that.width,
            h = that.height,
            scale = w / h;
        console.log('w', w, 'h', h, 'scale', scale)
        w = 630;
        h = (w / scale);
        let quality = 0.2; // 默认图片质量为0.7
        //3为左旋

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        // 创建属性节点
        let anw = document.createAttribute("width");
        let anh = document.createAttribute("height");
        //非正常情况，顺着拍的
        let degree
        if (scale < 1) {
            anw.nodeValue = h;
            anh.nodeValue = w;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            //左旋
            degree = 3 * 90 * Math.PI / 180;
            ctx.rotate(degree)
            ctx.drawImage(that, -w, 0, w, h);
        } else {
            anw.nodeValue = w;
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            // 不动
            degree = 0
            ctx.rotate(degree)
            ctx.drawImage(that, 0, 0, w, h);
        }
        //生成canvas
        // quality值越小，所绘制出的图像越模糊
        let base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        if (typeof (callback) == 'function') callback(base64);
    }
}
module.exports = {
    objToQuery,
    accMul,
    setCookie,
    getCookie,
    deleteCookie,
    addYear,
    addDay,
    dealImage
}
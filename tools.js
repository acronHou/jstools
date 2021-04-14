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
export const getCookie = function (key) {
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
 * @param domain {string|undefined} 删除的cookie的domain
 */
export const deleteCookie = function (key, domain) {
    let date = new Date();
    let deleteCookieStr = ""
    date.setTime(date.getTime() - 10000);
    deleteCookieStr = key + "=" + getCookie(key) + "; expires=" + date.toGMTString() + ";path=/"
    if (domain) deleteCookieStr += ";domain=" + domain
    document.cookie = deleteCookieStr
}

module.exports = {
    objToQuery,
    accMul,
    setCookie,
    getCookie,
    deleteCookie
}
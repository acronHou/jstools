/**
 * object转query 
 * @param {Object} obj 要转成query的数据集合
 * @param {Boolean} flag 可选，是否需要进行url转码
 * @return {String} 最终拼接成的query字符串
 */
function objToQuery(obj, flag) {
    if (!obj instanceof Object) {
        throw ('Object转Query方法入参错误');
    }
    let arr = [];
    for (let k in obj) {
        let str = k + '=' + (flag ? encodeURIComponent(obj[k]) : obj[k]);
        arr.push(str);
    }
    return arr.join('&')
}

/**
 * 生成随机数
 * @param {Number} len 随机数长度
 * @return {String} 生成的随机数结果
 */
function randomString(len) {
    const strLength;
    if (len && typeof len === 'number') {
        strLength = len;
    } else {
        strLength = 32;
    }
    const $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < strLength; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * (maxPos + 1)));
    }
    return pwd;
}

// sessionStorage 操作
const session = {
    /**
     * 存入session的方法
     * @param {*} key session存储的名字
     * @param {*} val session存储的值
     */
    s: function (key, val) {
        if (typeof val == 'string' || typeof val == 'number' || typeof val == 'boolean') {
            sessionStorage.setItem(key, val);
        } else if (typeof val == 'object') {
            try {
                sessionStorage.setItem(key, JSON.stringify(val));
            } catch (err) {
                console.log(err);
                throw ('存储session方法，第二参数传值异常');
            }
        } else {
            throw ('存储session方法，第二参数传值异常');
        }
    },
    /**
     * 获取session的方法
     * @param {*} key session存储的名字
     * @return {*} 取到对应session的
     */
    g: function (key) {
        try {
            return JSON.parse(sessionStorage.getItem(key));
        } catch (e) {
            return sessionStorage.getItem(key);
        }
    },
    d: function (key) {
        sessionStorage.removeItem(key);
    }
}

/**
 * 校验日期格式
 * @param {String} type 想要校验的格式，目前支持：yyyy-mm-dd
 * @param {String} str 想要校验的数据
 * @return {Boolean} 校验结果
 */
function dateFormat(type, str) {
    let regx, result = false;
    switch (type) {
        case 'yyyy-mm-dd':
            regx = /^(\d{4})-(\d{2})-(\d{2})$/;
            result = regx.test(str);
            break;
    }
    return result
}

/**
 * 根据生日获取周岁年龄
 * @param {String} birthday 畜生日期，格式为yyyy-mm-dd
 * @return {Number} 实际年龄，如果返回-1表示计算错误
 */
function getAge(birthday) {
    if (!dateFormat(birthday)) {
        throw ('获取周岁年龄传入的日期格式错误');
    }
    let birthdayArr = birthday.split("-");
    let birthYear = birthdayArr[0];
    let birthMonth = birthdayArr[1];
    let birthDay = birthdayArr[2];
    let d = new Date();
    let nowYear = d.getFullYear();
    let nowMonth = d.getMonth() + 1;
    let nowDay = d.getDate();
    if (nowYear === birthYear) {
        return 0;
    }
    let returnAge;
    let ageDiff = nowYear - birthYear;
    if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
            let dayDiff = nowDay - birthDay;
            if (dayDiff < 0) {
                returnAge = ageDiff - 1;
            } else {
                returnAge = ageDiff;
            }
        } else {
            let monthDiff = nowMonth - birthMonth;
            if (monthDiff < 0) {
                returnAge = ageDiff - 1;
            } else {
                returnAge = ageDiff;
            }
        }
    } else {
        returnAge = -1;
    }
    return returnAge
}

/**
 * 通过身份证获取生日
 * @param {String} idNo 身份证号
 * @return {String} 出生日期 yyyy-mm-dd
 */
function getBirthdayByIdNo(idNo) {
    let birthdayY, birthdayM, birthdayD;
    if (idNo.length == 15) {
        birthdayY = "19" + idNo.substr(6, 2);
        birthdayM = idNo.substr(8, 2);
        birthdayD = idNo.substr(10, 2);
    } else if (idNo.length == 18) {
        birthdayY = idNo.substr(6, 4);
        birthdayM = idNo.substr(10, 2);
        birthdayD = idNo.substr(12, 2);
    } else {
        throw ('获取出生日期传入的证件号格式有误');
    }
    return birthdayY + '-' + birthdayM + '-' + birthdayD
}

/**
 * 根据身份证号获取性别
 * @param {String} idNo 身份证号
 * @return {Boolean}
 */
function getSexByIdNo(idNo) {
    let sexNo;
    if (idNo.length == 18) {
        sexNo = idNo.substring(16, 17);
    } else if (idNo.length == 15) {
        sexNo = idNo.substring(14, 15);
    } else {
        throw ('获取性别传入的证件号格式有误');
    }
    if (sexNo % 2 === 0) {
        return '女'
    } else {
        return '男'
    }
    
}

/**
 * 判断是否是微信环境
 * @return {String|Boolean} qywx：企业微信环境；wx：普通微信环境；false：非微信环境
 */
function getWXEnv() {
    let ua = window.navigator.userAgent.toLowerCase();
    if ((ua.match(/MicroMessenger/i) == 'micromessenger') && (ua.match(/wxwork/i) == 'wxwork')) {
        return 'qywx'
    } else if (ua.match(/micromessenger/i) == 'micromessenger') {
        return 'wx'
    } else {
        return false
    }
}

/**
 * 判断是否为IOS设备
 * @return {Boolean}
 */
function isIos() {
    let u = navigator.userAgent;
    if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
        return true;
    }
    return false;
}

module.exports = {
    objToQuery,
    randomString,
    session,
    dateFormat,
    getAge,
    getBirthdayByIdNo,
    getSexByIdNo,
    getWXEnv,
    isIos
}
/**
 * 数据脱敏
 * @param {String} data 必选，要进行脱敏处理的数据
 * @param {Number} startLen 必选，可传0，数据从前开始非脱敏的长度
 * @param {Number} endLen 非必选，默认0，数据从后开始非脱敏的长度
 * @return {String} 脱敏处理后的数据，当startLen和endLen都为0时，全部数据脱敏
 */
function dataMask(data, startLen, endLen) {
    if (!(data && typeof data === 'string') || !((startLen || startLen === 0) && typeof startLen === 'number')) {
        throw ('数据脱敏参数传递错误');
    }
    if ((endLen || endLen === 0) && typeof endLen !== 'number') {
        throw ('数据脱敏参数传递错误');
    }
    let sLen = startLen,
        eLen = endLen || 0,
        dataLen = data.length,
        maskLen = 0;
    if (sLen + eLen > dataLen) {
        return ''
    }
    if (sLen === 0 && eLen === 0) {
        maskLen = dataLen;
        let arr = new Array(maskLen);
        arr.fill('*');
        return arr.join('');
    } else {
        maskLen = dataLen - sLen - eLen;
        let arr = new Array(maskLen);
        arr.fill('*');
        let sStr = data.substr(0, sLen);
        let eStr = data.substr(dataLen - eLen, eLen);
        return `${sStr}${arr.join('')}${eStr}`
    }
}

/**
 * 每固定位数加空格
 * @param value {string} 目标字符串
 * @param spaceLength {number} 间隔长度
 * @returns {string}
 */
function stringFormatSpace(value, spaceLength) {
    let result = '';
    let num1 = value
    while (num1.length > spaceLength) {
        result += num1.slice(0, spaceLength) + ' ';
        num1 = num1.slice(spaceLength, value.length);
    }
    if (num1) {
        result = result + num1;
    }
    return result
}

/**
 * 千分位加逗号，并保留两位小数
 * @param num  数字
 * @returns {string}
 */
function toThousands(num) {
    if (num === undefined) return ''
    if (num === '0' || num === 0) return '0'
    let result = '';
    num = Number(num.toString() || 0).toFixed(2);
    let numAry = num.toString().split(".");
    let preNum = numAry[0];
    let lastNum = numAry[1];
    while (preNum.length > 3) {
        result = ',' + preNum.slice(-3) + result;
        preNum = preNum.slice(0, preNum.length - 3);
    }
    if (preNum) {
        result = preNum + result;
    }
    result = result + "." + lastNum;
    return result;
}

/**
 *中间内容变星号
 * @param v {string} 目标字符串
 * @param start {number} 开始位置
 * @param number 变星号数目
 * @returns {string}
 */
function hideContent(v, start, number) {
    if (!v) return ''
    let result = "";
    // 1字符串转化成数组
    let phoneArr = [...v];
    start--
    // 2.将数组中的指定位变成*
    phoneArr.forEach((res, index) => {
        if (index >= start && index < start + number) {
            result += '*';
        } else {
            result += res;
        }
    });
    return result
}

/**
 *格式化时间
 * @param time {string} 时间
 * @param format {string} 格式化字符串 eg. YYYY-MM-DD hh:mm:ss
 * @returns {string}
 */
function formatDate(time, format) {
    const now = new Date().getTime()
    if (!time) time = now

    // while (time.toString().length < 13) time += '0'

    const date = new Date(time.toString().replace(/\-/g, "/").replace(/T/g, " ").split('.')[0])
    date.getMonth()
    /** 参数集 年-月-日 时:分:秒 */
    const arg = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
        minutes: date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
        seconds: date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
    }

    /** 判断有没有指定的时间格式 */
    switch (format) {
        case 'YYYY-MM-DD hh:mm:ss':
            return `${arg.year}-${arg.month}-${arg.day} ${arg.hours}:${arg.minutes}:${arg.seconds}`
        case 'YYYY-MM-DD':
            return `${arg.year}-${arg.month}-${arg.day}`
        case 'MM-DD':
            return `${arg.month}-${arg.day}`
        case 'hh:mm:ss':
            return `${arg.hours}:${arg.minutes}:${arg.seconds}`
        case 'hh:mm':
            return `${arg.hours}:${arg.minutes}`
        case 'ymd':
            return `${arg.year}年${arg.month}月${arg.day}日`
        case 'ymdsfm':
            return `${arg.year}年${arg.month}月${arg.day}日${arg.hours}:${arg.minutes}`
        default:
            return `${arg.year}-${arg.month}-${arg.day}`
    }
}

/**
 * 展示最后n为
 * @param val 传入值
 * @param n {number} 位数
 * @returns {string}
 */
function lastN(val, n) {
    let result = '';
    if (val) {
        result = val.substring(val.length - n)
    } else {
        result = ""
    }
    return result
}

// 星期转换
function weekFilter(enWeek) {
    let week = {
        Monday: '星期一',
        Tuesday: '星期二',
        Wednesday: '星期三',
        Thursday: '星期四',
        Friday: '星期五',
        Saturday: '星期六',
        Sunday: '星期日',
    }
    if (!Object.keys(week).includes(enWeek)) {
        console.warn('输入的英文星期有误，eg：Monday')
        return
    }
    return week[enWeek]
}

module.exports = {
    dataMask,
    stringFormatSpace,
    toThousands,
    hideContent,
    formatDate,
    lastN,
    weekFilter
}
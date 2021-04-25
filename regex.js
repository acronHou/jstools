// 非空校验
function isHasValue(value) {
    if (null != value && "null" != value && "" != value && "undefined" != value && undefined != value) {
        return true;
    }
    return false;
}


/**
 * 校验银行卡号的luhn方法
 * @param bankNo {number}
 * @returns {boolean}
 */
function luHn(bankNo) {
    let sum = 0;
    let bankNoArray = [...bankNo]
    let length = bankNoArray.length;

    for (let i = 0; i < length; i++) {

        // get digits in reverse order
        let digit = Number(bankNoArray[length - i - 1])

        // every 2nd number multiply with 2
        if (i % 2 === 1) {
            digit *= 2;
        }
        sum += digit > 9 ? digit - 9 : digit;
    }
    return sum % 10 === 0;
}

/**
 *银行卡校验
 * @param [bankNo]  银行卡号
 * @returns {string} 空字符串为正确 否则返回字符串为具体错误信息
 */
const bankNoChecker = function (bankNo) {
    if (!bankNo) {
        return `请输入银行卡号`
    }
    if (!luHn(bankNo)) {
        return `请输入正确银行卡`
    }
    return ``
}

/**
 * 校验邮箱
 * @param [email] {string}
 * @returns {string} 空字符为正确
 */
const emailChecker = function (email) {
    const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

    if (!email) {
        return '请输入投保人电子邮箱地址'
    }
    if (!emailRegex.test(email)) {
        return `投保人电子邮箱地址格式错误，请重新输入`
    }
    return ''
}

//校验身份证最后一位
function checkIDNoLastCode(IDNo) {
    IDNo = IDNo.toUpperCase();
    var a = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
    var b = "10X98765432";
    var sum = 0;
    for (var i = 0; i < 17; i++) {
        sum += a[i] * IDNo.substring(i, i + 1); // 加权求和
    }
    var x = sum % 11; // 得到验证码所位置
    if (IDNo.substring(17, 18) == b.substring(x, x + 1)) {
        return true;
    } else {
        return false;
    }
}

// 获取周岁年龄
const getAge = function (birthday) {
    var returnAge;
    var birthdayArr = birthday.split("-");
    var birthYear = birthdayArr[0];
    var birthMonth = birthdayArr[1];
    var birthDay = birthdayArr[2];
    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
    if (nowYear == birthYear) {
        return 0; //同年 则为0岁
    }
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
            var dayDiff = nowDay - birthDay; //日之差
            if (dayDiff < 0) {
                returnAge = ageDiff - 1;
            } else {
                returnAge = ageDiff;
            }
        } else {
            var monthDiff = nowMonth - birthMonth; //月之差
            if (monthDiff < 0) {
                returnAge = ageDiff - 1;
            } else {
                returnAge = ageDiff;
            }
        }
    } else {
        returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
    }
    return returnAge; //返回周岁年龄
}

//根据身份证获取出生日期，格式YYYY-MM-DD
function getBirthdayFromIDNo(IDNo) {
    var tmpStr;
    if (IDNo.length == 15) {
        tmpStr = IDNo.substring(6, 12);
        tmpStr = "19" + tmpStr;
    } else if (IDNo.length == 18) {
        tmpStr = IDNo.substring(6, 14);
    }
    tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
    return tmpStr;
}

/**
 * 校验身份证规则
 * @param [IDNo]
 * @param [checkAge] {boolean} 是否校验年龄（18岁）
 * @returns {string}
 */
const idNoChecker = function (IDNo, checkAge) {
    const idcardRegex = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
    if (!IDNo) {
        return '请输入身份证号'
    }
    //正则判断
    if (!idcardRegex.test(IDNo)) {
        return '请输入正确的身份证号';
    }
    //校验位数和最后一位
    if (IDNo.length === 18 && !checkIDNoLastCode(IDNo)) {
        return '请输入正确的身份证号';
    }
    //校验出生日期
    if (checkAge) {
        if (getAge(getBirthdayFromIDNo(IDNo)) < 18) {
            return '您的年龄小于18周岁，无法投保，感谢您的支持与信任';
        }
    }
    return '';
}

/**
 * 校验手机号
 * @param phone
 * @param [aim] {string} 投保人/被保险人
 * @returns {string} 空字符为正确
 */
const phoneChecker = function (phone, aim = "") {
    const telRegex = /^1[3-9]\d{9}$/
    if (!phone) {
        return `请输入${aim}手机号码`
    } else if (!telRegex.test(phone)) {
        return `${aim}手机号输入有误，请重新输入`
    }
    return ''
}

/**
 * 判断是否为外链
 * @param {string} path
 * @returns {Boolean}
 */
function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}


module.exports = {
    isHasValue,
    bankNoChecker,
    emailChecker,
    idNoChecker,
    phoneChecker,
    isExternal
}



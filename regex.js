// 定义校验正则
const regex = {
    // 手机号
    tel: /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/,
    // 邮箱
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    // 密码：密码为8-16位，包含数字和字母
    password: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,16}$/,
    // 身份证号身份证号(15位、18位数字)，最后一位是校验位，可能为数字或字符X
    idcard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    // 姓名不能包含特殊字符
    name: /([`~!@#$%^&*()_\-+=<>?:"{},.\\/;'[\]])|([·！#￥（——）：；“”‘、，|《。》？、【】[\]])/im,
    // 非身份证、户口本的证证件号规则
    idNum: /^[0-9A-Za-z]{6,}$/
}

// 定义错误码，码值含义包括但不限于下面的解析
const checkerCode = {
    checkPass: true, // 通过格式校验
    valueNone: 001, // 表示传入的值为空字符串、null、undefined等
    wrongRule: 002, // 表示正则格式校验不通过
    specialCharacter: 003, // 表示存在特殊字符
    illegalText: 004, // 存在敏感字符
    capsLook: 005 // 存在大小写问题
}

/**
 * 校验空值 
 * @param {*} value 需要校验的值
 * @return {Number} 定义的错误码
 */
function isHasValue(value) {
    if (value === null || value === 'null' || value === undefined || value === 'undefined' || value === '' || value === null) {
        return checkerCode.valueNone
    } else {
        return checkerCode.checkPass
    }
}

module.exports = {
    isHasValue
}
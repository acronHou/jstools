/**
 * 数据脱敏
 * @param {String} data 必选，要进行脱敏处理的数据
 * @param {Number} startLen 必选，可传0，数据从前开始非脱敏的长度
 * @param {Number} endLen 非必选，默认0，数据从后开始非脱敏的长度
 * @return {String} 脱敏处理后的数据，当startLen和endLen都为0时，全部数据脱敏
 */
function dataMask(data, startLen, endLen) {
    if (!(data && typeof data === 'string') || !((startLen || startLen === 0) && typeof startLen === 'number')) {
        throw('数据脱敏参数传递错误');
    }
    if ((endLen || endLen === 0) && typeof endLen !== 'number') {
        throw('数据脱敏参数传递错误');
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

module.exports = {
    dataMask,
    stringFormatSpace
}
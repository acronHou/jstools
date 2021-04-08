// 非空校验
function isHasValue(value) {
    if (null != value && "null" != value && "" != value && "undefined" != value && undefined != value) {
        return true;
    }
    return false;
}
module.exports = {
    isHasValue
}



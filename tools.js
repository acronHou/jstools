

// 对象转url参数
objToQuery = function (obj) {
    let arr = [];
    for (let k in obj) {
        let str = k + '=' + obj[k];
        arr.push(str);
    }
    return arr.join('&')
}
module.exports = {
    objToQuery
}
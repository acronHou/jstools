

// 对象转url参数
function objToQuery(obj) {
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
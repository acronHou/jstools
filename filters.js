/**
 * 每隔4位加一个空格
 * @param num
 * @returns {string|string}
 */

let obj = {
    function npm-stringFormatSpace(value,spaceLength) {
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
}

module.exports = {
    a:obj.stringFormatSpace
}


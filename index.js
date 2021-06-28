// js方法
var tools = require('./tools.js')
var regex = require('./regex.js')
var filters = require('./filters.js')
var idadtTools= {
    ...tools,
    ...regex,
    ...filters
}
// 组件方法
var hktoast = require('./uniComps/common/toast/index.js')
var uniComps = {
    hktoast
}
module.exports = {
    idadtTools,
    uniComps
}



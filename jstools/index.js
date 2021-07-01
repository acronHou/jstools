// js方法
var tools = require('./tools.js')
var regex = require('./regex.js')
var filters = require('./filters.js')
var idadtTools= {
    ...tools,
    ...regex,
    ...filters
}

module.exports = {
    idadtTools
}
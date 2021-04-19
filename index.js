
var tools = require('./tools')
var regex = require('./regex')
var filters = require('./filters')
var idadtTools=  {
    ...tools,
    ...regex,
    ...filters
}
module.exports = {
    idadtTools 
}



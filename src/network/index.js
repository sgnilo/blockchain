// 网络模块的api聚合文件，此文件主要内容是整个网络模块运行初始化的逻辑，并将部分操作api向外提供
const listener = require('./listener');
const request = require('./request');
const checkLoop = require('./checkloop');
const client = require('./client');
// const config = require('./net-config');

listener.initNetWork().then(({ip, port}) => {
    client.findAndJoinNet(ip, port);
}).catch(err => console.error(err));

checkLoop.check();

module.exports = {
    toPoint: request.toPoint,
    toAll: request.toAll
};
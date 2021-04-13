// 网络模块的api聚合文件，此文件主要内容是整个网络模块运行初始化的逻辑，并将部分操作api向外提供
const listener = require('./listener');
const request = require('./request');
const checkLoop = require('./checkloop');
const client = require('./client');
const event = require('../util/event');
const config = require('./net-config');
const cache = require('./cache');

class NetWork {
    constructor(server, client) {
        this.server = server;
        this.client = client;
        event.on('init', data => this.initServer(data));
        event.on('join', data => this.joinNet(data));
        event.on('sync', data => this.syncData(data));
        event.on('setting', data => this.setTask(data));
        event.fire('init');
    }

    initServer() {
        this.server.initNetWork(config.runPort).then(data => {
            console.log('网络监听器初始化完成！');
            cache.setCache('thisAddress', data);
            event.fire('join', data);
        }).catch(err => console.error(err));
    }

    joinNet(data) {
        const {ip: thisIp, port: thisPort} = data;
        this.client.findAndJoinNet(thisIp, thisPort).then(() => {
            console.log('加入区块链网络完成');
            event.fire('sync');
        });
    }

    syncData() {
        this.client.syncBlockChain().then(() => {
            console.log('区块链数据同步完成');
            event.fire('setting');
        });
    }

    setTask() {
        checkLoop.check(config.checkLoopDuration);
        console.log('巡检任务设置完成');
    }
}

const netWork = new NetWork(listener, client);



module.exports = {
    toPoint: request.toPoint,
    toAll: request.toAll
};
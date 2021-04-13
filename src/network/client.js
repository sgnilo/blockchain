// 每个区块链系统本身既是客户端，也是服务端，此文件为客户端请求方法
const config = require('./net-config');
const request = require('./request');
const chainOperate = require('../data/chainOperate');

const findAndJoinNet = (myIP, myPORT) => {
    const [ip, port] = config.proxyIP.split('-');
    if (ip != myIP || port != myPORT) {
        return request.toPoint(ip, port, `0|${myIP}-${myPORT}`).then(res => {
            const list = JSON.parse(res);
            request.updateIpList(list);
            console.log('加入成功！');
        }).catch(e => {
            console.log('加入区块链网络失败！');
            console.error(e);
        });
    }
    return Promise.resolve();
};

// const askSomeThing = (ip, port, signal, data) => {
//     const info = {signal, data};
//     return request.toPoint(ip, port, `3|${JSON.stringify(info)}`);
// };

const getNearestServer = data => {
    return request.toAll(`3|${JSON.stringify(data)}`).then(result => {
        const validIpList = result.filter(everyReq => !!everyReq.value).map(item => item.value);
        return request.toAllWithRace(`3|`, validIpList);
    });
};

const syncBlockChain = (chainType = 'head') => {
    const params = {
        name: 'chainType',
        value: chainType
    };
    return getNearestServer(params).then(res => {
        const {ip, port} = JSON.parse(res);
        const params = {
            ip,
            port,
            onData: chunk => chainOperate.syncChainFile(chunk)
        };
        return request.download(params);
    });
};

module.exports = {
    findAndJoinNet,
    syncBlockChain,
    getNearestServer
};
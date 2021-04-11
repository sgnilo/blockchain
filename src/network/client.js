// 每个区块链系统本身既是客户端，也是服务端，此文件为客户端请求方法
const config = require('./net-config');
const request = require('./request');
const chainOperate = require('../data/chainOperate');

const findAndJoinNet = (myIP, myPORT) => {
    const [ip, port] = config.proxyIP.split('-');
    if (ip != myIP || port != myPORT) {
        request.toPoint(ip, port, `0|${myIP}-${myPORT}`).then(res => {
            const list = JSON.parse(res);
            request.updateIpList(list);
            console.log('加入成功！');
        }).catch(e => {
            console.log('加入区块链网络失败！');
            console.error(e);
        });
    }
};

// const askSomeThing = (ip, port, signal, data) => {
//     const info = {signal, data};
//     return request.toPoint(ip, port, `3|${JSON.stringify(info)}`);
// };

const syncBlockChain = (allNode = false) => {
    request.toAllWithRace(`3|`).then(res => {
        const {ip, port} = JSON.parse(res);
        const params = {
            ip,
            port,
            dataString: `4|${allNode ? 1 : 0}`,
            onData: chunk => chainOperate.syncChainFile(chunk)
        };
        request.download(params);
    });
};

module.exports = {
    findAndJoinNet,
    syncBlockChain
};
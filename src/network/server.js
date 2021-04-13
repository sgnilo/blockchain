// 每个区块链系统本身既是客户端，也是服务端，此文件为服务端请求方法
const request = require('./request');
const chainOperate = require('../data/chainOperate');
const demand = require('./demand');

const joinBlockChainNetwork = (context, data) => {
    const [ip, port] = data.split('-');
    syncIpList(context, data);
    request.toAll(`1|${ip}-${port}`).catch(err => {});
    const list = request.getIpList();
    context.write(JSON.stringify(list));
};

const syncIpList = (context, data) => {
    const [ip, port] = data.split('-');
    const dataString = `${ip}-${port}`;
    const list = request.getIpList();
    !list.some(item => item === dataString) && request.updateIpList(dataString);
};

const stillAlive = (context, data) => {
    context.write('alive');
};

const getNearestIp = (context, data) => {
    const {type, value} = JSON.parse(data || '{}');
    console.log('debug: i am here')
    if (demand.verify(type, value)) {
        const {port, address} = context.address();
        context.write(JSON.stringify({port, ip: address}));
    }
};

const transferChain = (context, data) => {
    const fileList = chainOperate.getFullFileList();
    fileList.forEach(file => {
        const fileInfo = chainOperate.getFileContentWithFileName(fileInfo);
        context.write(JSON.parse(fileInfo));
    });
    const activeFileInfo = chainOperate.getFileContentWithFileName('chain.json');
    context.write(JSON.stringify(activeFileInfo));
};

module.exports = {
    joinBlockChainNetwork,
    syncIpList,
    stillAlive,
    getNearestIp,
    transferChain
}
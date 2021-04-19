// 每个区块链系统本身既是客户端，也是服务端，此文件为服务端请求方法
const request = require('./request');
const chainOperate = require('../data/chainOperate');
const demand = require('./demand');
const net = require('net');

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
    console.log('debug: i am here', type, value, demand.verify(type, value))
    if (demand.verify(type, value) || !data) {
        const {port, address} = context.address();
        console.log(context.address());
        console.log('是否合法：', net.isIP(address));
        context.write(JSON.stringify({port, ip: address}));
    }
};

const writeFile = (context, data, size = 1000) => {
    const {fileName, fileContent} = data;
    
    const contentBufferList = [];
    let index = 0;
    while (index < fileContent.length) {
        const tempContent = fileContent.slice(index, index + size);
        const contentBuffer = Buffer.alloc(tempContent.length, tempContent);
        contentBufferList.push(contentBuffer);
        index += size;
    }
    contentBufferList.forEach(buffer => {
        context.write(buffer);
    });
    // const nameBuffer = Buffer.alloc(fileName.length, fileName);
    // console.log(contentBufferList);
    // console.log(nameBuffer);
    // context.write(nameBuffer);
};

const writeInfo = (context, fileList) => {
    fileList.map((file, index) => {
        let padding = `${file.name}|${file.contentLength}|${index + 1 < fileList.length ? 1 : 0}`;
        while (padding.length < 40) {
            padding += '#';
        }
        console.log(padding, padding.length);
        return Buffer.alloc(padding.length, padding);
    }).forEach(buffer => {
        context.write(buffer);
    });
};

const transferChain = (context, data) => {
    const fileNameList = chainOperate.getFullFileList();
    console.log('接收到了同步区块数据的请求', fileNameList);
    const fileList = fileNameList.map(file => chainOperate.getFileContentLength(file));
    const activeFile = chainOperate.getFileContentLength('chain.json');
    const configFile = chainOperate.getFileContentLength('file-map.json');
    writeInfo(context, [...fileList, activeFile, configFile]);
    fileNameList.forEach(fileName => writeFile(context, chainOperate.getFileContentWithFileName(fileName)));
    writeFile(context, chainOperate.getFileContentWithFileName('chain.json'));
    writeFile(context, chainOperate.getFileContentWithFileName('file-map.json'));
};

module.exports = {
    joinBlockChainNetwork,
    syncIpList,
    stillAlive,
    getNearestIp,
    transferChain
}
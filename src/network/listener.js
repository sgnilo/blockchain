// 网络监听， 此区块链系统在整个区块链网络中的节点
const net = require('net');
const operate = require('./server');


const codeToMethod = {
    0: 'joinBlockChainNetwork',
    1: 'syncIpList',
    2: 'stillAlive',
    3: 'getNearestIp',
    4: 'transferChain'
}

const initNetWork = (port = 2222) => {
    return new Promise((resolve ,reject) => {
        try {
            const server = net.createServer();

            server.on('connection', socket => {
                socket.setEncoding('utf-8');
                socket.on('data', res => {
                    const [type, data] = res.split('|');
                    const fnName = codeToMethod[type];
                    operate[fnName] && operate[fnName](socket, data);
                    socket.end();
                });
            });

            server.listen(port, () => {
                const ip = server.address().address;
                console.log(`now is listening at ${ip}:${port}`);
                resolve({ip, port})
            });
        } catch (e) {
            reject(e);
        }
        
    });

};

module.exports = {
    initNetWork
};


const net = require('net');
const operate = require('./process');


const codeToMethod = {
    0: 'joinBlockChainNetwork',
    1: 'syncIpList',
    2: 'stillAlive'
}

const server = net.createServer();

server.on('connection', socket => {
    socket.setEncoding('utf-8');
    socket.on('data', res => {
        console.log(res)
        const [type, data] = res.split('|');
        const fnName = codeToMethod[type];
        operate[fnName] && operate[fnName](socket, data);
    });
    socket.end();
});

server.listen(2222, () => {
    console.log('now is listening at 2222');
});


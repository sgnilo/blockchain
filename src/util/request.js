const net = require('net');

const request = (ip, port, dataString, callBack) => {
    const socket = net.connect(port, ip);

    socket.on('connect', () => {
        socket.write(dataString);
    });

    let data;

    socket.setEncoding('utf-8');

    socket.on('data', data => {
        data = data;
    });

    socket.on('close', () => {
        callBack(data);
    });
};

module.exports = {
    request
}
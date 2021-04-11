const net = require('net');

const request = (ip, port, dataString, callBack, errCallBack) => {
    const socket = net.connect(port, ip);

    socket.on('connect', () => {
        socket.write(dataString);
    });

    let tempData;

    socket.setEncoding('utf-8');

    socket.on('data', data => {
        tempData = data;
    });

    socket.on('error', err => {
        errCallBack && errCallBack(err);
    });

    socket.on('close', () => {
        callBack && callBack(tempData);
    });
};

const fileTransfer = option => {
    const {ip, port, dataString, callBack, errCallBack, onData} = option;
    const socket = net.connect(port, ip);

    socket.on('connect', () => {
        socket.write(dataString);
    });

    socket.on('error', err => {
        errCallBack && errCallBack(err);
    });

    socket.on('data', onData || (data => {}));

    socket.on('close', () => {
        callBack && callBack();
    });

};

module.exports = {
    request,
    fileTransfer
}
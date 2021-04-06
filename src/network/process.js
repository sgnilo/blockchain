const request = require('./request');

const joinBlockChainNetwork = (context, data) => {
    const [ip, port] = data.split('-');
    syncIpList(context, data);
    request.toAll(`1|${ip}-${port}`);
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

module.exports = {
    joinBlockChainNetwork,
    syncIpList,
    stillAlive
}
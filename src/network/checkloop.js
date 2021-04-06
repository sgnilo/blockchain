// 巡检ip表
const request = require('./request');

const check = time => {
    const ipList = request.getIpList();
    ipList.forEach(item => {
        const [ip, port] = item.split('-');
        request.toPoint(ip, port, '2|').catch(err => {
            ipList.splice(ipList.findIndex(ipAddr => ipAddr === item), 1);
            request.updateIpList(ipList);
        });
    });
    setTimeout(() => check(time), time || 7200);
};

module.exports = {
    check
}
// 巡检ip表
const request = require('./request');

const check = time => {
    const ipList = request.getIpList();
    console.log('巡检中···');
    let useLessIpList = [];
    ipList.forEach(item => {
        const [ip, port] = item.split('-');
        request.toPoint(ip, port, '2|').catch(err => {
            ipList.splice(ipList.findIndex(ipAddr => ipAddr === item), 1);
            request.updateIpList(ipList);
            useLessIpList.push(ipAddr);
        });
    });
    console.log(`本次共发现并清楚无效ip共${useLessIpList.length}个,分别为：${useLessIpList.join('\n')}`);
    setTimeout(() => check(time), time || 7200000);
};

module.exports = {
    check
}
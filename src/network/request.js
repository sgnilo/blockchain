const fs = require('fs');
const path = require('path');
const util = require('../util/request');

const toPoint = (ip, port, data) => {
    return new Promise((resolve, reject) => {
        try {
            util.request(ip, parseInt(port, 10), data, res => {
                resolve(res);
            });
        } catch (e) {
            reject(e);
        }
    });
};

const toAll = data => {
    const ipList = getIpList();
    return Promise.all(ipList.map(item => {
        const [ip, port] = item.split('-');
        return new Promise((resolve, reject) => {
            try {
                util.request(ip, parseInt(port, 10), data, res => {
                    resolve(res);
                });
            } catch (e) {
                reject(e);
            }
        });
    }));
};

const IPFILENAME = path.resolve(__dirname, 'ip.json');

const getIpList = () => JSON.parse(fs.readFileSync(IPFILENAME));

const updateIpList = ipAddr => {
    const ipList = getIpList();
    const newIpList = Array.isArray(ipAddr) ? ipAddr : [...ipList, ipAddr];
    fs.writeFileSync(IPFILENAME, JSON.stringify(newIpList));
}

module.exports = {
    toPoint,
    toAll,
    getIpList,
    updateIpList
}
// 该文件内为网络模块的工具函数
const fs = require('fs');
const path = require('path');
const util = require('../util/request');
const net = require('net');

const toPoint = (ip, port, data) => {
    return new Promise((resolve, reject) => {
        try {
            if (!net.isIP(ip)) {
                throw new Error('无效IP!');
            }
            util.request(ip, parseInt(port, 10), data, res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        } catch (e) {
            reject(e);
        }
    });
};

const toAll = data => {
    const ipList = getIpList();
    return Promise.allSettled(ipList.map(item => {
        const [ip, port] = item.split('-');
        return new Promise((resolve, reject) => {
            try {
                if (!net.isIP(ip)) {
                    throw new Error('无效IP!');
                }
                util.request(ip, parseInt(port, 10), data, res => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
            } catch (e) {
                reject(e);
            }
        });
    }));
};

const toAllWithRace = data => {
    const ipList = getIpList();
    return Promise.race(ipList.map(item => {
        const [ip, port] = item.split('-');
        return new Promise((resolve, reject) => {
            try {
                if (!net.isIP(ip)) {
                    throw new Error('无效IP!');
                }
                util.request(ip, parseInt(port, 10), data, res => {
                    resolve(res);
                }, err => {
                    reject(err);
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
};

const download = option => {
    return new Promise((resolve, reject) => {
        try {
            const {ip, callBack, errCallBack} = option;
            if (!net.isIP(ip)) {
                throw new Error('无效IP!');
            }
            const callBack = res => {
                resolve(res);
            };
            const errCallBack = err => {
                reject(err);
            };
            util.fileTransfer({...option, callBack, errCallBack});
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    toPoint,
    toAll,
    getIpList,
    updateIpList,
    download,
    toAllWithRace
}
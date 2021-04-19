const chainOperate = require('../data/chainOperate');
const chain = require('../chain/chain');
const chainConfig = require('../chain/config');
const requestClient = require('../network/client');

const getMerklePath = param => {
    const {time, hash, height} = param;
    if (chainConfig.chainType === 'all') {
        const exactBlock = chainOperate.getExactBlock({time, height});
        const path = chain.getVerifyPath(hash, exactBlock.body.root[0]);
        return path;
    } else {
        requestClient.getNearestServer({type: 'chainType', value: 'all'}).then(res => {
            const {ip, port} = JSON.parse(res);
            
        });
    }
    
};

module.exports = {
    getMerklePath
};
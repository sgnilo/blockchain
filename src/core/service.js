const chainOperate = require('../data/chainOperate');
const chain = require('../chain/chain');
const chainConfig = require('../chain/config');
const requestClient = require('../network/client');

const isExisit = param => {
    const {time, hash, height} = param;
    if (chainConfig.chainType === 'all') {
        const exactBlock = chainOperate.getExactBlock({time, height});
        const path = chain.getVerifyPath(hash, exactBlock.body.root[0]);
        return Promise.resolve(chain.verifyWithMerklePath(hash, path, exactBlock.body.root[0].value));
    } else {
        return requestClient.getExactBlock({height, time}).then(data => {
            const path = chain.getVerifyPath(hash, data.body.root[0]);
            return chain.verifyWithMerklePath(hash, path, data.body.root[0].value);
        });
    }
};

const addBlock = infoList => {
    const block = chain.makeBlock(infoList);
    if (chain.verifyBlock(block) && chain.isPreBlock(block, chainOperate.getPreBlock())) {
        return requestClient.throwBlockToNetwork(block).then(result => {
            let i = 0;
            result.forEach(item => item.value && i++);
            if (i > 6 || i === result.length) {
                chainOperate.writeFile(block);
                return true;
            } else {
                return false;
            }
        });
    } else {
        return Promise.resolve(false);
    }
};

module.exports = {
    isExisit,
    addBlock
};
const config = require('./config.js');
const sha = require('sha1');
const cache = require('../network/cache');
const chainOperate = require('../data/chainOperate');

/**
 * 生成区块
 * @param {object} infoList 要记录的列表
 * @param {object} preBlock 上一区块
 */
const createBlock = (infoList) => {
    const preBlock = cache.getCache('preBlock') || chainOperate.getPreBlock() || {height: 0};
    const body = createBlockBody(infoList);
    const option = {
        preBlock: preBlock.head ? sha(JSON.stringify(preBlock.head)) : null,
        merkleRoot: body.root,
    };
    const head = createBlockHead(option);
    const block = {
        head,
        body,
        height: preBlock.height + 1
    };
    cache.setCache('preBlock', block);
    return block;
};

/**
 * 生成merkle树
 * @param {object} infoList 要记录的列表
 * @returns {object} 生成的树
 */
const createMerkleTree = infoList => {
    let level = 0;
    const iterator = list => {
        level++;
        let count = 0;
        const tempList = [];
        while (count < list.length) {
            const pre = list[count].value;
            const cur = ((list[count + 1] || {}).value || '');
            const node = {
                left: list[count],
                right: list[count + 1],
                value: sha(pre > cur ? pre + cur : cur + pre),
                level
            };
            tempList.push(list[count + 1] ? node : {...list[count], level});
            count += 2;
        }
        return tempList;
    }
    let hashArr = infoList.map(item => ({
            value: sha(JSON.stringify(item)),
            left: null,
            right: null,
            current: item,
            level
        }));
    while (hashArr.length > 1) {
        hashArr = iterator(hashArr);
    }
    return hashArr[0];
}

const createBlockBody = infoList => {
    const topNode = createMerkleTree(infoList);
    return {
        records: infoList.length,
        root: topNode
    }
}

/**
 * 生成区块头
 * @param {object}} option 配置项，包含前一区块头hash值以及merkle树根节点
 * @returns {object} 生成的头节点
 */
const createBlockHead = (option) => {
    const head = {
        version: config.version || 1,
        preBlock: option.preBlock,
        timestamp: new Date().getTime(),
        merkleHash: sha(JSON.stringify(option.merkleRoot))
    };
    head.randNum = getRandomNum(head, 0);
    return head;
}

/**
 * 根据难度生成随机数
 * @param {Object} node 区块头
 * @param {number} num 生成的随机数
 * @returns {number} 生成的随机数
 */
const getRandomNum = (node, num) => {
    const hashStr = sha(JSON.stringify({...node, randNum: num}));
    return hashStr.startsWith(config.hardLevel) ? num : getRandomNum(node, num + 1);
}

/**
 * 验证该区块是否符合规则以及可否纳入区块链
 * @param {object} block 进行验证的区块
 * @returns {boolean}
 */
const verifyBlock = block => sha(JSON.stringify(block.head)).startsWith(config.hardLevel);

/**
 * 计算某个节点的merkle验证路径
 * @param {string} hash 该节点的hash值
 * @param {object} tree merkle树根结点
 * @returns {Array}
 */
const getVerifyPath = (hash, tree) => {
    const path = [];
    const find = node => {
        const left = node.left && find(node.left);
        const right = node.left && find(node.right);
        left && node.right && path.push({
            value: node.right.value,
            level: node.right.level
        });
        right && node.left && path.push({
            value: node.left.value,
            level: node.right.level
        });
        return left || right || node.value === hash;
    };
    find(tree);
    return path;
};

/**
 * 根据某个节点的merkle路径验证是否存在于该merkle树
 * @param {string} hash 进行验证的节点的hash
 * @param {Array} result merkle认证路径
 * @param {string} rootHash merkle树根hash值
 * @returns {boolean}
 */
const verifyWithMerklePath = (hash, result, rootHash) => {
    const root = result.reduce((total, item) => {
        return sha(total > item.value ? total + item.value : item.value + total);
    }, hash);
    return root === rootHash;
};

/**
 * 判断某区块是否是该区块的前一区块
 * @param {object} block 进行验证的区块
 * @param {object} pre 进行验证的前一区块
 * @returns {boolean}
 */
const isPreBlock = (block, pre) => {
    return block.head.preBlock === sha(JSON.stringify(pre.head));
};


module.exports = {
    makeBlock: createBlock,
    verifyBlock,
    getVerifyPath,
    verifyWithMerklePath,
    isPreBlock
}
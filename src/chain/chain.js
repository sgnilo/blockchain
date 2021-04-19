const config = require('./config.js');
const sha = require('sha1');

/**
 * 生成区块
 * @param {object} infoList 要记录的列表
 * @param {object} preBlock 上一区块
 */
const createBlock = (infoList, preBlock = {height: 0}) => {
    const body = createBlockBody(infoList);
    const option = {
        preBlock: preBlock.head ? sha(JSON.stringify(preBlock.head)) : null,
        merkleRoot: body.root,
    };
    const head = createBlockHead(option);
    return {
        head,
        body,
        height: preBlock.height++
    }
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
    return hashArr;
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
        merkleHash: sha(option.merkleRoot)
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




module.exports = {
    makeBlock: createBlock,
    verifyBlock
}
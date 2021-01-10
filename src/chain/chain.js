const config = require('./config.json');
const sha = require("sha1");

console.log(config)

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

const mock = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
    {id: 9},
]

// 创建merkle树
const createMerkleTree = infoList => {
    let level = 0;
    const iterator = list => {
        level++;
        let count = 0;
        const tempList = [];
        while (count < list.length) {
            const node = {
                left: list[count],
                right: list[count + 1],
                value: sha(list[count].value + ((list[count + 1] || {}).value || '')),
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

const getRandomNum = (node, num) => {
    const hashStr = sha(JSON.stringify({...node, randNum: num}));
    return hashStr.startsWith(config.hardLevel) ? num : getRandomNum(node, num + 1);
}

const res = createBlock(mock);

console.log(res);

// export default {

// }
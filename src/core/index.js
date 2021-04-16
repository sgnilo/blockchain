const chain = require('../chain/chain.js');
const operate = require('../data/chainOperate');


function init() {

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

    const block = chain.makeBlock(mock);
    console.log('生成了一个新区块，区块内容是', block);
    console.log('区块验证结果：', chain.verifyBlock(block));
    return block;
};

let i = 1000;

while (i--) {
    const newBlock = init();
    operate.writeFile(newBlock);
}


// module.exports = init();
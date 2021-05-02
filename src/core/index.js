const chain = require('../chain/chain.js');
const operate = require('../data/chainOperate');
const {network} = require('../network/index');
const service = require('./service');
const cache = require('../network/cache');


network.consume = () => {
    console.log('运行正常，进入平稳运行阶段');
    cache.setCache('preBlock', operate.getPreBlock());
    console.log(cache.getCache('preBlock'));
    const params = {
        height: 583,
        time: 1618836901353,
        hash: '1a6146c8b2b6ef7e9eb6ad30f3c58e05f6bb4b9a'
    };
    service.isExisit(params).then(res => console.log(res));
    service.addBlock([{name: 'hi'}, {name: 'iam test'}]).then(res => {
        console.log('是否添加成功:', res);
        console.log(cache.getCache('preBlock'));
        console.log(operate.getExactBlock());
    });
};

network.runNetWork();



// function init() {

//     const mock = [
//         {id: 1},
//         {id: 2},
//         {id: 3},
//         {id: 4},
//         {id: 5},
//         {id: 6},
//         {id: 7},
//         {id: 8},
//         {id: 9},
//     ]

//     const block = chain.makeBlock(mock);
//     console.log('生成了一个新区块，区块内容是', block);
//     console.log('区块验证结果：', chain.verifyBlock(block));
//     return block;
// };

// let i = 1000;

// while (i--) {
//     const newBlock = init();
//     operate.writeFile(newBlock);
// }


// module.exports = init();
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
    });
};

network.runNetWork();

// function init() {

//     const mock = [
//         {
//           userId: 8,
//           userName: '000',
//           productName: 'jjj',
//           productDesc: 'kk',
//           productMd5: 'acb58fae46e6b0c9b9d83c8afd4c996d'
//         },
//         {
//           userId: 8,
//           userName: '000',
//           productName: 'ooo',
//           productDesc: 'lll',
//           productMd5: '7020bddfd0d896cc85e5cf070e864596'
//         },
//         {
//           userId: 8,
//           userName: '000',
//           productName: '第七次测试',
//           productDesc: 'no content',
//           productMd5: '9f75415c06a9f84b14cd31c754ff6f34'
//         },
//         {
//           userId: 8,
//           userName: '000',
//           productName: '更多更多',
//           productDesc: '坎坎坷坷',
//           productMd5: '2b67ec712dc147862078c1d05eec6771'
//         },
//         {
//           userId: 8,
//           userName: '000',
//           productName: '测试大一点的文件',
//           productDesc: 'no content',
//           productMd5: '75ca19a829012d0fd66232fdf1f31a25'
//         }
//       ]
//     const block = chain.makeBlock(mock);
//     console.log('生成了一个新区块，区块内容是', block);
//     console.log('区块验证结果：', chain.verifyBlock(block));
//     return block;
// };

// operate.writeFile(init());

// let i = 1000;

// while (i--) {
//     const newBlock = init();
//     operate.writeFile(newBlock);
// }


// module.exports = init();
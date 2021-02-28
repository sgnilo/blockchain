const fs = require('fs');
const path = require('path');

// 处于活跃的可读写数据文件
const EXACTFILENAME = path.resolve(__dirname, 'chain.json');

// 配置文件
const CONFIGFILENAME = path.resolve(__dirname, 'chain-config.json');

/**
 * 获取文件内容
 * @param {string} fileName 
 */
const getFileContent = fileName => JSON.parse(fs.readFileSync(fileName));

const chainConfig = getFileContent(CONFIGFILENAME);


/**
 * 获取当前活跃读写文件大小
 * @param {string} fileName 文件名
 * @returns {number} 文件大小
 */
const getSize = fileName => fs.statSync(fileName || EXACTFILENAME).size;

/**
 * 写入文件
 * @param {object} content 
 */
const writeFile = chain => {
    if (getSize() >= chainConfig.limitSize) {
        const fullFileName = `chain-${chainConfig.fullFileList.length}.json`;
        fs.renameSync(EXACTFILENAME, path.resolve(__dirname, fullFileName));
        chainConfig.fullFileList.push(fullFileName);
        fs.writeFileSync(CONFIGFILENAME, JSON.stringify(chainConfig));
        fs.writeFileSync(EXACTFILENAME, '[]');
    }
    const chains = [...getFileContent(EXACTFILENAME), chain];
    fs.writeFileSync(EXACTFILENAME, JSON.stringify(chains));
}




// console.log(getSize());

// console.log(chainConfig);
let count = 10000;
const data = [
    {
        head: {
          version: 1,
          preBlock: null,
          timestamp: 1613810528889,
          merkleHash: '5ba93c9db0cff93f52b521d7420e43f6eda2784f',
          randNum: 251
        },
        body: { records: 9, root: [ [Object] ] },
        height: 0
    },
    {
        head: {
          version: 1,
          preBlock: null,
          timestamp: 1613810528889,
          merkleHash: '5ba93c9db0cff93f52b521d7420e43f6eda2784f',
          randNum: 251
        },
        body: { records: 9, root: [ [Object] ] },
        height: 0
      },
      {
        head: {
          version: 1,
          preBlock: null,
          timestamp: 1613810528889,
          merkleHash: '5ba93c9db0cff93f52b521d7420e43f6eda2784f',
          randNum: 251
        },
        body: { records: 9, root: [ [Object] ] },
        height: 0
      },
      {
        head: {
          version: 1,
          preBlock: null,
          timestamp: 1613810528889,
          merkleHash: '5ba93c9db0cff93f52b521d7420e43f6eda2784f',
          randNum: 251
        },
        body: { records: 9, root: [ [Object] ] },
        height: 0
      },
      {
        head: {
          version: 1,
          preBlock: null,
          timestamp: 1613810528889,
          merkleHash: '5ba93c9db0cff93f52b521d7420e43f6eda2784f',
          randNum: 251
        },
        body: { records: 9, root: [ [Object] ] },
        height: 0
      },
      {
        head: {
          version: 1,
          preBlock: null,
          timestamp: 1613810528889,
          merkleHash: '5ba93c9db0cff93f52b521d7420e43f6eda2784f',
          randNum: 251
        },
        body: { records: 9, root: [ [Object] ] },
        height: 0
      },
      {
        head: {
          version: 1,
          preBlock: null,
          timestamp: 1613810528889,
          merkleHash: '5ba93c9db0cff93f52b521d7420e43f6eda2784f',
          randNum: 251
        },
        body: { records: 9, root: [ [Object] ] },
        height: 0
      },
      {
        head: {
          version: 1,
          preBlock: null,
          timestamp: 1613810528889,
          merkleHash: '5ba93c9db0cff93f52b521d7420e43f6eda2784f',
          randNum: 251
        },
        body: { records: 9, root: [ [Object] ] },
        height: 0
      },
      {
        head: {
          version: 1,
          preBlock: null,
          timestamp: 1613810528889,
          merkleHash: '5ba93c9db0cff93f52b521d7420e43f6eda2784f',
          randNum: 251
        },
        body: { records: 9, root: [ [Object] ] },
        height: 0
      },
      {
        head: {
          version: 1,
          preBlock: null,
          timestamp: 1613810528889,
          merkleHash: '5ba93c9db0cff93f52b521d7420e43f6eda2784f',
          randNum: 251
        },
        body: { records: 9, root: [ [Object] ] },
        height: 0
      },
      {
        head: {
          version: 1,
          preBlock: null,
          timestamp: 1613810528889,
          merkleHash: '5ba93c9db0cff93f52b521d7420e43f6eda2784f',
          randNum: 251
        },
        body: { records: 9, root: [ [Object] ] },
        height: 0
      },
      {
        head: {
          version: 1,
          preBlock: null,
          timestamp: 1613810528889,
          merkleHash: '5ba93c9db0cff93f52b521d7420e43f6eda2784f',
          randNum: 251
        },
        body: { records: 9, root: [ [Object] ] },
        height: 0
      },
      {
        head: {
          version: 1,
          preBlock: null,
          timestamp: 1613810528889,
          merkleHash: '5ba93c9db0cff93f52b521d7420e43f6eda2784f',
          randNum: 251
        },
        body: { records: 9, root: [ [Object] ] },
        height: 0
      },
      {
        head: {
          version: 1,
          preBlock: null,
          timestamp: 1613810528889,
          merkleHash: '5ba93c9db0cff93f52b521d7420e43f6eda2784f',
          randNum: 251
        },
        body: { records: 9, root: [ [Object] ] },
        height: 0
      }
];

while (count--) {
    writeFile(data);
}
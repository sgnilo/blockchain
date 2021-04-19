const fs = require('fs');
const path = require('path');

// 处于活跃的可读写数据文件
const EXACTFILENAME = path.resolve(__dirname, 'chain.json');

// 配置文件
const CONFIGFILENAME = path.resolve(__dirname, 'chain-config.json');

const FILEMAPNAME = path.resolve(__dirname, 'file-map.json');

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
        const fileMap = getFileContent(FILEMAPNAME);
        if (!fileMap[fullFileName]) {
          fileMap[fullFileName] = {};
        }
        fileMap[fullFileName] = fileMap['chain.json'];
        delete fileMap['chain.json'];
        fs.writeFileSync(FILEMAPNAME, JSON.stringify(fileMap));
        fs.renameSync(EXACTFILENAME, path.resolve(__dirname, fullFileName));
        chainConfig.fullFileList.push(fullFileName);
        fs.writeFileSync(CONFIGFILENAME, JSON.stringify(chainConfig));
        fs.writeFileSync(EXACTFILENAME, '[]');
    }
    const fileMap = getFileContent(FILEMAPNAME);
    if (!fileMap['chain.json']) {
      fileMap['chain.json'] = {};
    }
    fileMap['chain.json'].time = chain.head.timestamp;
    fileMap['chain.json'].height = chain.height;
    fs.writeFileSync(FILEMAPNAME, JSON.stringify(fileMap));
    const chains = [...getFileContent(EXACTFILENAME), chain];
    fs.writeFileSync(EXACTFILENAME, JSON.stringify(chains));
};

const syncChainFile = chunk => {
  const {fileName, fileContent} = chunk;
  fs.writeFileSync(path.resolve(__dirname, fileName), fileContent, {flag: 'as'});
  if (fileName !== 'chain.json' && !chainConfig.fullFileList.includes(fileName)) {
    chainConfig.fullFileList.push(fileName);
    fs.writeFileSync(CONFIGFILENAME, JSON.stringify(chainConfig));
  }
};

const getFullFileList = () => {
  const {fullFileList} = chainConfig;
  return fullFileList;
};

const getFileContentWithFileName = fileName => {
  console.log('文件名：', fileName);
  return {
    fileName,
    fileContent: JSON.stringify(getFileContent(path.resolve(__dirname, fileName)))
  };
};

const getFileContentLength = fileName => {
  const contentLength = JSON.stringify(getFileContent(path.resolve(__dirname, fileName))).length;
  return {
    name: fileName,
    contentLength
  }
};

const getPreBlock = () => {
  const chain = getFileContent(EXACTFILENAME);
  return chain[chain.length - 1];
};

const getNearestFile = (value, type = 'time') => {
  const fileMap = getFileContent(FILEMAPNAME);
  const fileList = [];
  for (let file in fileMap) {
    fileList.push({
      file,
      time: fileMap[file].time,
      height: fileMap[file].height
    });
  }
  fileList.sort((a, b) => a.value - b.value);
  let fileName = '';
  fileList.forEach(item => {
    if (value < item[type]) {
      fileName = item.file;
    }
  })
  return fileName;
};

const getExactBlock = data => {
  const {height, time} = data;
  const fileName = getNearestFile(time);
  const chain = getFileContent(fileName);
  let i = 0;
  while (i < chain.length) {
    if (chain[i].height === height) {
      break;
    }
    i++;
  }
  return chain[i];
}

module.exports = {
  writeFile,
  syncChainFile,
  getFullFileList,
  getFileContentWithFileName,
  getFileContentLength,
  getPreBlock,
  getNearestFile,
  getExactBlock
};

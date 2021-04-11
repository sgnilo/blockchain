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
};

const syncChainFile = chunk => {
  const {fileName, fileContent} = JSON.parse(chunk);
  fs.writeFileSync(path.resolve(__dirname, fileName), JSON.stringify(fileContent));
  if (fileName !== 'chain.json') {
    chainConfig.fullFileList.push(fileName);
    fs.writeFileSync(CONFIGFILENAME, JSON.stringify(chainConfig));
  }
};

const getFullFileList = () => {
  const {fullFileList} = chainConfig;
  return fullFileList;
};

const getFileContentWithFileName = fileName => {
  return {
    fileName,
    fileContent: getFileContent(fileName)
  };
};

module.exports = {
  writeFile,
  syncChainFile,
  getFullFileList,
  getFileContentWithFileName
};

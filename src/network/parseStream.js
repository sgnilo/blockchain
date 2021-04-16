const chainOperate = require('../data/chainOperate');

class ChunkParse {
    constructor() {
        this.fileList = [];
        this.step = 40;
        this.current = 0;
        this.status = false;
        this.tempStr = '';
        this.index = 0;
    }

    make(chunk) {
        this.status ? this.parseContent(chunk) : this.parseHead(chunk);
        this.current = 0;
    }

    parseContent(chunk) {
        console.log('开始解析内容了')
        const exactFile = this.fileList[this.index];
        if (exactFile) {
            const content = chunk.slice(this.current, this.current + exactFile.length).toString();
            this.current += content.length;
            chainOperate.syncChainFile({fileName: exactFile.name, fileContent: content});
            if (content.length < exactFile.length) {
                exactFile.length -= content.length;
            } else {
                this.index++;

            }
            this.current < chunk.length - 1 && this.parseContent(chunk);
        }
    }

    parseHead(chunk) {
        let tempStr = this.tempStr;
        tempStr += chunk.slice(this.current, this.current + (this.step - this.tempStr.length)).toString();
        console.log(tempStr);
        this.current += tempStr.length;
        this.tempStr = tempStr.length === 40 ? '' : tempStr;
        if (!this.tempStr) {
            const [name, length, hasNext] = tempStr.replace(/#/g, '').split('|');
            this.fileList.push({name, length: parseInt(length), hasNext: parseInt(hasNext)});
            if (!parseInt(hasNext)) {
                this.status = true;
                console.log(this.fileList);
                this.current < chunk.length && this.parseContent(chunk);
            } else {
                this.parseHead(chunk);
            }
        }
    }
}

module.exports = {
    ChunkParse
}
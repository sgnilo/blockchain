(()=>{var e={487:e=>{var t={utf8:{stringToBytes:function(e){return t.bin.stringToBytes(unescape(encodeURIComponent(e)))},bytesToString:function(e){return decodeURIComponent(escape(t.bin.bytesToString(e)))}},bin:{stringToBytes:function(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t},bytesToString:function(e){for(var t=[],n=0;n<e.length;n++)t.push(String.fromCharCode(e[n]));return t.join("")}}};e.exports=t},12:e=>{var t,n;t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n={rotl:function(e,t){return e<<t|e>>>32-t},rotr:function(e,t){return e<<32-t|e>>>t},endian:function(e){if(e.constructor==Number)return 16711935&n.rotl(e,8)|4278255360&n.rotl(e,24);for(var t=0;t<e.length;t++)e[t]=n.endian(e[t]);return e},randomBytes:function(e){for(var t=[];e>0;e--)t.push(Math.floor(256*Math.random()));return t},bytesToWords:function(e){for(var t=[],n=0,o=0;n<e.length;n++,o+=8)t[o>>>5]|=e[n]<<24-o%32;return t},wordsToBytes:function(e){for(var t=[],n=0;n<32*e.length;n+=8)t.push(e[n>>>5]>>>24-n%32&255);return t},bytesToHex:function(e){for(var t=[],n=0;n<e.length;n++)t.push((e[n]>>>4).toString(16)),t.push((15&e[n]).toString(16));return t.join("")},hexToBytes:function(e){for(var t=[],n=0;n<e.length;n+=2)t.push(parseInt(e.substr(n,2),16));return t},bytesToBase64:function(e){for(var n=[],o=0;o<e.length;o+=3)for(var r=e[o]<<16|e[o+1]<<8|e[o+2],s=0;s<4;s++)8*o+6*s<=8*e.length?n.push(t.charAt(r>>>6*(3-s)&63)):n.push("=");return n.join("")},base64ToBytes:function(e){e=e.replace(/[^A-Z0-9+\/]/gi,"");for(var n=[],o=0,r=0;o<e.length;r=++o%4)0!=r&&n.push((t.indexOf(e.charAt(o-1))&Math.pow(2,-2*r+8)-1)<<2*r|t.indexOf(e.charAt(o))>>>6-2*r);return n}},e.exports=n},738:(e,t,n)=>{var o,r,s,i;o=n(12),r=n(487).utf8,s=n(487).bin,(i=function(e,t){var n=o.wordsToBytes(function(e){e.constructor==String?e=r.stringToBytes(e):"undefined"!=typeof Buffer&&"function"==typeof Buffer.isBuffer&&Buffer.isBuffer(e)?e=Array.prototype.slice.call(e,0):Array.isArray(e)||(e=e.toString());var t=o.bytesToWords(e),n=8*e.length,s=[],i=1732584193,l=-271733879,c=-1732584194,a=271733878,h=-1009589776;t[n>>5]|=128<<24-n%32,t[15+(n+64>>>9<<4)]=n;for(var g=0;g<t.length;g+=16){for(var p=i,u=l,f=c,y=a,d=h,v=0;v<80;v++){if(v<16)s[v]=t[g+v];else{var k=s[v-3]^s[v-8]^s[v-14]^s[v-16];s[v]=k<<1|k>>>31}var m=(i<<5|i>>>27)+h+(s[v]>>>0)+(v<20?1518500249+(l&c|~l&a):v<40?1859775393+(l^c^a):v<60?(l&c|l&a|c&a)-1894007588:(l^c^a)-899497514);h=a,a=c,c=l<<30|l>>>2,l=i,i=m}i+=p,l+=u,c+=f,a+=y,h+=d}return[i,l,c,a,h]}(e));return t&&t.asBytes?n:t&&t.asString?s.bytesToString(n):o.bytesToHex(n)})._blocksize=16,i._digestsize=20,e.exports=i},504:(e,t,n)=>{const o=n(206),r=n(738),s=n(975),i=n(772),l=e=>{const t={version:o.version||1,preBlock:e.preBlock,timestamp:(new Date).getTime(),merkleHash:r(JSON.stringify(e.merkleRoot))};return t.randNum=c(t,0),t},c=(e,t)=>r(JSON.stringify({...e,randNum:t})).startsWith(o.hardLevel)?t:c(e,t+1);e.exports={makeBlock:e=>{const t=s.getCache("preBlock")||i.getPreBlock()||{height:0},n=(e=>{const t=(e=>{let t=0;const n=e=>{t++;let n=0;const o=[];for(;n<e.length;){const s=e[n].value,i=(e[n+1]||{}).value||"",l={left:e[n],right:e[n+1],value:r(s>i?s+i:i+s),level:t};o.push(e[n+1]?l:{...e[n],level:t}),n+=2}return o};let o=e.map((e=>({value:r(JSON.stringify(e)),left:null,right:null,current:e,level:t})));for(;o.length>1;)o=n(o);return o[0]})(e);return{records:e.length,root:t}})(e),o={preBlock:t.head?r(JSON.stringify(t.head)):null,merkleRoot:n.root},c={head:l(o),body:n,height:t.height+1};return s.setCache("preBlock",c),c},verifyBlock:e=>r(JSON.stringify(e.head)).startsWith(o.hardLevel),getVerifyPath:(e,t)=>{const n=[],o=t=>{const r=t.left&&o(t.left),s=t.left&&o(t.right);return r&&t.right&&n.push({value:t.right.value,level:t.right.level}),s&&t.left&&n.push({value:t.left.value,level:t.right.level}),r||s||t.value===e};return o(t),n},verifyWithMerklePath:(e,t,n)=>t.reduce(((e,t)=>r(e>t.value?e+t.value:t.value+e)),e)===n,isPreBlock:(e,t)=>e.head.preBlock===r(JSON.stringify(t.head))}},206:e=>{e.exports={version:1,hardLevel:"00",chainType:"all"}},763:(e,t,n)=>{n(504);const o=n(772),{network:r}=n(603),s=n(554),i=n(975);r.consume=()=>{console.log("运行正常，进入平稳运行阶段"),i.setCache("preBlock",o.getPreBlock()),console.log(i.getCache("preBlock")),s.isExisit({height:583,time:1618836901353,hash:"1a6146c8b2b6ef7e9eb6ad30f3c58e05f6bb4b9a"}).then((e=>console.log(e))),s.addBlock([{name:"hi"},{name:"iam test"}]).then((e=>{console.log("是否添加成功:",e),console.log(i.getCache("preBlock"))}))},r.runNetWork()},554:(e,t,n)=>{const o=n(772),r=n(504),s=n(206),i=n(547);e.exports={isExisit:e=>{const{time:t,hash:n,height:l}=e;if("all"===s.chainType){const e=o.getExactBlock({time:t,height:l}),s=r.getVerifyPath(n,e.body.root);return Promise.resolve(r.verifyWithMerklePath(n,s,e.body.root.value))}return i.getExactBlock({height:l,time:t}).then((e=>{const t=r.getVerifyPath(n,e.body.root);return r.verifyWithMerklePath(n,t,e.body.root.value)}))},addBlock:e=>{const t=r.makeBlock(e);return console.log("ppppppp",t.body.root),r.verifyBlock(t)&&r.isPreBlock(t,o.getPreBlock())?(console.log("is here"),i.throwBlockToNetwork(t).then((e=>{console.log(e);let n=0;return e.forEach((e=>e.value&&n++)),(n>6||n===e.length)&&(o.writeFile(t),!0)}))):(console.log("what the fuck",r.isPreBlock(t,o.getPreBlock())),Promise.resolve(!1))}}},772:(e,t,n)=>{var o="src/data";const r=n(747),s=n(622),i=s.resolve(o,"chain.json"),l=s.resolve(o,"chain-config.json"),c=s.resolve(o,"file-map.json"),a=e=>{try{return JSON.parse(r.readFileSync(e))}catch(e){return console.log("解析出错了",e),[]}},h=a(l),g=(e,t="time")=>{const n=a(c),o=[];for(let e in n)o.push({file:e,time:n[e].time,height:n[e].height});o.sort(((e,t)=>e.value-t.value));let r="";for(let n=0;n<o.length;n++)if(e<o[n][t]){r=o[n].file;break}return r};e.exports={writeFile:e=>{if(r.statSync(i).size>=h.limitSize){const e=`chain-${h.fullFileList.length}.json`,t=a(c);t[e]||(t[e]={}),t[e]=t["chain.json"],delete t["chain.json"],r.writeFileSync(c,JSON.stringify(t)),r.renameSync(i,s.resolve(o,e)),h.fullFileList.push(e),r.writeFileSync(l,JSON.stringify(h)),r.writeFileSync(i,"[]")}const t=a(c);t["chain.json"]||(t["chain.json"]={}),t["chain.json"].time=e.head.timestamp,t["chain.json"].height=e.height,r.writeFileSync(c,JSON.stringify(t));const n=[...a(i),e];r.writeFileSync(i,JSON.stringify(n))},syncChainFile:e=>{const{fileName:t,fileContent:n}=e;r.writeFileSync(s.resolve(o,t),n,{flag:"as"}),"chain.json"===t||h.fullFileList.includes(t)||(h.fullFileList.push(t),r.writeFileSync(l,JSON.stringify(h)))},getFullFileList:()=>{const{fullFileList:e}=h;return e},getFileContentWithFileName:e=>(console.log("文件名：",e),{fileName:e,fileContent:JSON.stringify(a(s.resolve(o,e)))}),getFileContentLength:e=>({name:e,contentLength:JSON.stringify(a(s.resolve(o,e))).length}),getPreBlock:()=>{const e=a(i);return e[e.length-1]},getNearestFile:g,getExactBlock:e=>{console.log(e);const{height:t,time:n}=e;console.log(t,n);const r=g(n);console.log(r);const i=a(s.resolve(o,r));let l=0;for(;l<i.length&&i[l].height!==t;)l++;return i[l]}}},975:e=>{const t={};e.exports={setCache:(e,n)=>{t[e]=n},getCache:e=>t[e]}},366:(e,t,n)=>{const o=n(145),r=e=>{const t=o.getIpList();console.log("巡检中···");let n=[];t.forEach((e=>{const[r,s]=e.split("-");o.toPoint(r,s,"2|").catch((r=>{t.splice(t.findIndex((t=>t===e)),1),o.updateIpList(t),n.push(ipAddr)}))})),console.log(`本次共发现并清楚无效ip共${n.length}个,分别为：${n.join("\n")}`),setTimeout((()=>r(e)),e||72e5)};e.exports={check:r}},547:(e,t,n)=>{const o=n(17),r=n(145),{ChunkParse:s}=(n(772),n(610)),i=e=>r.toAll(`3|${JSON.stringify(e)}`).then((e=>{console.log(e);const t=e.filter((e=>!!e.value)).map((e=>{const{ip:t,port:n}=JSON.parse(e.value||"{}");return`${t}-${n}`}));return r.toAllWithRace("3|",t)}));e.exports={findAndJoinNet:(e,t)=>{const[n,s]=o.proxyIP.split("-");return n!=e||s!=t?r.toPoint(n,s,`0|${e}-${t}`).then((e=>{const t=JSON.parse(e);r.updateIpList(t),console.log("加入成功！")})).catch((e=>{console.log("加入区块链网络失败！"),console.error(e)})):Promise.resolve()},syncBlockChain:(e="head")=>i({type:"chainType",value:e}).then((e=>{const{ip:t,port:n}=JSON.parse(e),o=new s,i={ip:t,port:n,dataString:"4|",onData:e=>{o.make(e)}};return r.download(i)})).catch((e=>console.error(e))),getNearestServer:i,getExactBlock:e=>i({type:"chainType",value:"all"}).then((t=>{const{ip:n,port:o}=JSON.parse(t);return r.toPoint(n,o,`5|${JSON.stringify(e)}`).then((e=>JSON.parse(e)))})),throwBlockToNetwork:e=>r.toAll(`6|${JSON.stringify(e)}`),getNewestBlock:()=>i({type:"online",value:!0}).then((e=>{const{ip:t,port:n}=JSON.parse(e);return r.toPoint(t,n,"7|").then((e=>JSON.parse(e)))}))}},395:(e,t,n)=>{const o=n(206),r={chainType:e=>e===o.chainType,online:e=>e};e.exports={verify:(e,t)=>!!(e&&t&&r[e])&&r[e](t)}},603:(e,t,n)=>{const o=n(170),r=n(145),s=n(366),i=n(547),l=n(38),c=n(17),a=n(975),h=n(206),g=n(772);e.exports={toPoint:r.toPoint,toAll:r.toAll,network:new class{constructor(e,t){this.server=e,this.client=t,l.on("init",(e=>this.initServer(e))),l.on("join",(e=>this.joinNet(e))),l.on("sync",(e=>this.syncData(e))),l.on("setting",(e=>this.setTask(e))),l.on("finish",(e=>this.consume&&this.consume(e)))}runNetWork(){l.fire("init")}initServer(){this.server.initNetWork(c.runPort).then((e=>{console.log("网络监听器初始化完成！"),a.setCache("thisAddress",e),l.fire("join",e)})).catch((e=>console.error(e)))}joinNet(e){const{ip:t,port:n}=e;this.client.findAndJoinNet(t,n).then((()=>{console.log("加入区块链网络完成"),l.fire("sync")}))}syncData(){this.client.getNewestBlock().then((e=>{if(JSON.stringify(e)!==JSON.stringify(g.getPreBlock()))return this.client.syncBlockChain(h.chainType).then((()=>{console.log("区块链数据同步完成")}))})).finally((()=>{l.fire("setting")}))}setTask(){s.check(c.checkLoopDuration),console.log("巡检任务设置完成"),l.fire("finish")}}(o,i)}},170:(e,t,n)=>{const o=n(631),r=n(360),s={0:"joinBlockChainNetwork",1:"syncIpList",2:"stillAlive",3:"getNearestIp",4:"transferChain",5:"getExactBlock",6:"receiveNewBlock",7:"newestBlock"};e.exports={initNetWork:(e=2222)=>new Promise(((t,n)=>{try{const n=o.createServer();n.on("connection",(e=>{e.setEncoding("utf-8"),e.on("data",(t=>{const[n,o]=t.split("|"),i=s[n];console.log("ppppppppp",e.address()),r[i]&&r[i](e,o),e.end()}))})),n.listen(e,(()=>{const o=n.address().address;console.log(`now is listening at ${o}:${e}`),t({ip:o,port:e})}))}catch(e){n(e)}}))}},17:e=>{e.exports={proxyIP:"127.0.0.1-2222",runPort:6666,checkLoopDuration:6e4}},610:(e,t,n)=>{const o=n(772);e.exports={ChunkParse:class{constructor(){this.fileList=[],this.step=40,this.current=0,this.status=!1,this.tempStr="",this.index=0}make(e){this.status?this.parseContent(e):this.parseHead(e),this.current=0}parseContent(e){console.log("开始解析内容了");const t=this.fileList[this.index];if(t){const n=e.slice(this.current,this.current+t.length).toString();this.current+=n.length,o.syncChainFile({fileName:t.name,fileContent:n}),n.length<t.length?t.length-=n.length:this.index++,this.current<e.length-1&&this.parseContent(e)}}parseHead(e){let t=this.tempStr;if(t+=e.slice(this.current,this.current+(this.step-this.tempStr.length)).toString(),console.log(t),this.current+=t.length,this.tempStr=40===t.length?"":t,!this.tempStr&&t){const[n,o,r]=t.replace(/#/g,"").split("|");this.fileList.push({name:n,length:parseInt(o),hasNext:parseInt(r)}),parseInt(r)?this.parseHead(e):(this.status=!0,console.log(this.fileList),this.current<e.length&&this.parseContent(e))}}}}},145:(e,t,n)=>{const o=n(747),r=n(622),s=n(255),i=n(631),l=n(975),c=r.resolve("src/network","ip.json"),a=()=>JSON.parse(o.readFileSync(c));e.exports={toPoint:(e,t,n)=>new Promise(((o,r)=>{try{if(!i.isIP(e))throw new Error("无效IP!");s.request(e,parseInt(t,10),n,(e=>{o(e)}),(e=>{r(e)}))}catch(e){r(e)}})),toAll:(e,t)=>{const n=l.getCache("thisAddress"),o=(t||a()).filter((e=>e!==`${n.ip}-${n.port}`));return Promise.allSettled(o.map((t=>{const[n,o]=t.split("-");return new Promise(((t,r)=>{try{if(console.log("普通广播使用的ip:",n,i.isIP(n)),!i.isIP(n))throw new Error("无效IP!");s.request(n,parseInt(o,10),e,(e=>{t(e)}),(e=>{r(e)}))}catch(e){r(e)}}))})))},getIpList:a,updateIpList:e=>{const t=a(),n=Array.isArray(e)?e:[...t,e];o.writeFileSync(c,JSON.stringify(n))},download:e=>new Promise(((t,n)=>{try{const{ip:o}=e;if(!i.isIP(o))throw new Error("无效IP!");const r=e=>{t(e)},l=e=>{n(e)};s.fileTransfer({...e,callBack:r,errCallBack:l})}catch(e){n(e)}})),toAllWithRace:(e,t)=>{const n=l.getCache("thisAddress"),o=(t||a()).filter((e=>e!==`${n.ip}-${n.port}`));return Promise.race(o.map((t=>{const[n,o]=t.split("-");return new Promise(((t,r)=>{try{if(!i.isIP(n))throw new Error("无效IP!");s.request(n,parseInt(o,10),e,(e=>{t(e)}),(e=>{r(e)}))}catch(e){r(e)}}))})))}}},360:(e,t,n)=>{const o=n(145),r=n(772),s=n(395),i=n(504),l=n(631),c=n(975),a=(e,t)=>{const[n,r]=t.split("-"),s=`${n}-${r}`;!o.getIpList().some((e=>e===s))&&o.updateIpList(s)},h=(e,t,n=1e3)=>{const{fileName:o,fileContent:r}=t,s=[];let i=0;for(;i<r.length;){const e=r.slice(i,i+n),t=Buffer.alloc(e.length,e);s.push(t),i+=n}s.forEach((t=>{e.write(t)}))};e.exports={joinBlockChainNetwork:(e,t)=>{const[n,r]=t.split("-");a(0,t),o.toAll(`1|${n}-${r}`).catch((e=>{}));const s=o.getIpList();e.write(JSON.stringify(s))},syncIpList:a,stillAlive:(e,t)=>{e.write("alive")},getNearestIp:(e,t)=>{const{type:n,value:o}=JSON.parse(t||"{}");if(console.log("debug: i am here",n,o,s.verify(n,o)),s.verify(n,o)||!t){const{port:t,address:n}=e.address();console.log(e.address()),console.log("是否合法：",l.isIP(n)),e.write(JSON.stringify({port:t,ip:n}))}},transferChain:(e,t)=>{const n=r.getFullFileList();console.log("接收到了同步区块数据的请求",n);const o=n.map((e=>r.getFileContentLength(e))),s=r.getFileContentLength("chain.json"),i=r.getFileContentLength("file-map.json");((e,t)=>{t.map(((e,n)=>{let o=`${e.name}|${e.contentLength}|${n+1<t.length?1:0}`;for(;o.length<40;)o+="#";return console.log(o,o.length),Buffer.alloc(o.length,o)})).forEach((t=>{e.write(t)}))})(e,[...o,s,i]),n.forEach((t=>h(e,r.getFileContentWithFileName(t)))),h(e,r.getFileContentWithFileName("chain.json")),h(e,r.getFileContentWithFileName("file-map.json"))},getExactBlock:(e,t)=>{const n=r.getExactBlock(JSON.parse(t));e.write(JSON.stringify(n))},receiveNewBlock:(e,t)=>{const n=JSON.parse(t);i.verifyBlock(n)&&i.isPreBlock(n,r.getPreBlock())&&(e.write("ok"),r.writeFile(n))},newestBlock:(e,t)=>{const n=c.getCache("preBlock")||r.getPreBlock();e.write(JSON.stringify(n))}}},38:e=>{const t={};e.exports={on:(e,n)=>{t[e]||(t[e]=[]),t[e].push(n)},fire:(e,n)=>{t[e]&&t[e].forEach((e=>{e&&e(n)}))},off:(e,n)=>{if(t[e]){const o=t[e].findIndex((e=>n===e));o>=0&&t[e].splice(o,1)}}}},255:(e,t,n)=>{const o=n(631);e.exports={request:(e,t,n,r,s)=>{const i=o.connect(t,e);let l;i.on("connect",(()=>{i.write(n||"")})),i.setEncoding("utf-8"),i.on("data",(e=>{l=e})),i.on("error",(e=>{s&&s(e)})),i.on("close",(()=>{r&&r(l)}))},fileTransfer:e=>{const{ip:t,port:n,dataString:r,callBack:s,errCallBack:i,onData:l}=e,c=o.connect(n,t);c.on("connect",(()=>{c.write(r||"")})),c.on("error",(e=>{i&&i(e)})),c.on("data",l||(e=>{})),c.on("close",(()=>{s&&s()}))}}},747:e=>{"use strict";e.exports=require("fs")},631:e=>{"use strict";e.exports=require("net")},622:e=>{"use strict";e.exports=require("path")}},t={};!function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}(763)})();
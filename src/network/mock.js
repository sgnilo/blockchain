const request = require('./request');
request.toPoint('127.0.0.1', 2222, '0|127.0.0.1-2222', res => {console.log(res)});
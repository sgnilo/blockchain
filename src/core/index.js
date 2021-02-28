const chain = require('../chain/chain.js');


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
    console.log(block);
    console.log(chain.verifyBlock(block));

};

init();


// module.exports = init();
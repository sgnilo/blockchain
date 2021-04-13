const eventMap = {};

const on = (eventName, fn) => {
    if (!eventMap[eventName]) {
        eventMap[eventName] = [];
    }
    eventMap[eventName].push(fn);
};

const fire = (eventName, data) => {
    eventMap[eventName] && eventMap[eventName].forEach(fn => {
        fn && fn(data);
    });
};

const off = (eventName, fn) => {
    if (eventMap[eventName]) {
        const current = eventMap[eventName].findIndex(callBack => fn === callBack);
        current >= 0 && eventMap[eventName].splice(current, 1);
    }
};

module.exports = {
    on,
    fire,
    off
}
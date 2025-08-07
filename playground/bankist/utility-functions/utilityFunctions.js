'use strict';

const userNameGenerator = function (name) {
    return name.toLowerCase().split(' ').join('');
};

const accNoGenerator = function () {
    return Math.floor(Math.random() * 100000);
};

export default { userNameGenerator, accNoGenerator };
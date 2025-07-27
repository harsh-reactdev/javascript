export default isSorted;


const compareStrings = function (order) {
    switch (order) {
        case 'asc': return arr.sort();

        case 'des': return arr.sort((a, b) => b.localCompare(a));

        default: throw new Error("Invalid order");
    }
};

const compareNumbers = function (order) {
    switch (order) {
        case 'asc': return arr.sort((a, b) => a - b);

        case 'des': return arr.sort((a, b) => b - a);

        default: throw new Error("Invalid order");
    }
};

const checkType = function (arr) {
    if (arr.every(item => typeof (item) === 'string')) {
        return 'string';
    } else if (arr.every(item => typeof (item) === 'number')) {
        return 'number';
    } else {
        return new Error("Cannot deduce for array of mixed data type.!");
    }
};
const isSorted = function (arr, order, arrType = '') {
    if (!arrType) {
        checkType(arr);
    }

    switch (arrType) {
        case 'string': compareStrings(order);
        case 'number': compareNumbers(order);
    }
};
(() => {
    let n = 8;

    const factLoop = function (num) {
        let f = 1;

        for (let i = num; i > 0; i--) {
            f *= i;
        }
        console.log(`using loops : ${f}`);
    };

    // factLoop(n);

    const factRecursive = function (numr) {
        if (numr > 0) {
            return numr * factRecursive(numr - 1);
        }
        return 1;
    };

    // console.log(`using recursion : ${factRecursive(8)}`);
})();
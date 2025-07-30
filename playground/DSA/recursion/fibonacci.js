(() => {
    const n = 32;

    const fibRecursive = function (num) {
        if (num === 0) {
            return 0;
        }
        if (num === 1) {
            return 1;
        }
        return fibRecursive(num - 1) + fibRecursive(num - 2);
    };

    // console.log(fibRecursive(n));

    const fibLoop = function (num) {
        let i = 0;
        let j = 1; x;
        let fib = 0;
        let c = 1;
        while (c <= num) {
            fib = i + j;
            i = j;
            j = fib;
            ++c;
        }
        console.log(fib);
    };

    fibLoop(2);
})();
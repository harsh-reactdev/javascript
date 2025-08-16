// exporting module

console.log('---- EXPORTING MODULE ----');

const shippingCost = 100;
const cart = [];

export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    // console.log(`${quantity} of ${product} has been added to cart`);
};

// // BLOCKING CODE : to showcase, how top level await can block code execution in importing module too
// console.log('Starting to fetch.');
// await fetch('https://jsonplaceholder.typicode.com/posts');
// console.log('Finished fetch.');

if (module.hot) {
    module.hot.accept();
}
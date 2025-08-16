const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

const getLimit = (user) => spendingLimits?.[user] ?? 0;

const addExpense = function (value, description, user = 'jonas  ') {
  // if (!user) user = 'jonas'; replaced with default parameters
  user = user.toLowerCase();

  // let limit = spendingLimits[user] ? spendingLimits[user] : 0; //OR
  // let limit = spendingLimits?.[user] ?? 0;
  // const limit =  getLimit(user);
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // } // replace with ternary operation


  if (value <= getLimit(user)) {
    budget.push({ value: -value, description, user });
  }
};
addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
console.log(budget);

const checkExpenses = function () {
  budget.forEach((entry) => {
    // let lim;
    // if (spendingLimits[el.user]) {
    //   lim = spendingLimits[el.user];
    // } else {
    //   lim = 0;
    // }

    // let limit = spendingLimits?.[user] ?? 0;
    // const limit = getLimit(user); 
    if (entry.value < -getLimit(entry.user)) {
      entry.flag = 'limit';
    }
  });
};
checkExpenses();

console.log(budget);

const bigExpenses = function (limit) {
  let output = '';
  // for (const entry of budget) {
  // if (entry.value <= -limit) {
  budget.forEach((entry) => {
    output += entry.value <= -limit ? entry.description.slice(-2) + ' / ' : ''; // Emojis are 2 chars
  });
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
  // }
};

bigExpenses(1000);
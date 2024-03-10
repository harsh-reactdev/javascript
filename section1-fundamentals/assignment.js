/*console.log('hey bish');

const country = 'India';
const population = '1.35 billion';
const continent = 'Asia';

console.log(
  `${country}, a country in ${continent}, has a population of ${population}.`
);*/

// BMI calculator

const calcBMI = (mass, height) => {
  return mass / (height * height);
};

const bmiHarsh = calcBMI(54, 1.73).toFixed(2);

// console.log(`Harsh has a BMI of ${bmiHarsh}`);

// Average calculator for an array of numbers

const calcAvg = arr => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum ? sum / arr.length : 'No elements in the array';
};

const arr = [12, 18, 92];

console.log(calcAvg(arr).toFixed(2));

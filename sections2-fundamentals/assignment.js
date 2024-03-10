// Score calculator

const calcAvg = (s1, s2, s3) => (s1 + s2 + s3) / 3;

function checkWinner(t1Avg, t2Avg) {
  if (t1Avg >= 2 * t2Avg) {
    console.log(`T1 wins (${t1Avg} vs. ${t2Avg})`);
  } else if (t2Avg >= 2 * t1Avg) {
    console.log(`T2 wins (${t2Avg} vs. ${t1Avg})`);
  } else console.log('No team wins...');
}

const t1Avg = calcAvg(20, 47, 32).toFixed(2);
const t2Avg = calcAvg(78, 76, 45).toFixed(2);

// checkWinner(t1Avg, t2Avg);

// ****************************************************************
// logic for printing missing number in a sequence of numbers in a sorted or an unsorted array
const arr = [9, 7, 3, 4, 5, 8, 2, 1];
let sum = 0;
let actualSum = 0;
for (let i = 0; i <= arr.length; i++) {
  // actualSum += i + 1;
  sum += arr[i];

  // or

  if (arr.includes(i) || i === 0) continue; //second condition applies only if the array is of whole numbers, else the condition could be excluded
  // else console.log(i, 'is missing');
  else break;
}

// const dffrnce = actualSum - sum;
// console.log(dffrnce);


// ****************************************************************
// logic for string character occurance

const str = 'fossil';
const occ = {};

for (i = 0; i < str.length; i++) {
  occ[str[i]] = Object.keys(occ).includes(str[i]) ? ++occ[str[i]] : 1;
}

// console.log(occ);



// ****************************************************************
// Objects 

const newObj = new Object({
  name: 'Harsh',
  birthyear: 2000,
  job: 'Frontend web developer',
  friends: ['Akhil', 'Abhijna', 'Puneeth', 'Mahesh', 'Jeevan'],
  hasDL: true,

  calcAge: function () {
    this.age = 2024 - this.birthyear;
    return this.age;
  }, //this keyword here points to newObj

  getSummary: function () {
    this.summary = `This is ${this.name}, a ${this.age} years old ${this.job}. He's got ${this.friends.length} friends and they are ${this.friends} . ${this.hasDL ? `He has an active drivers license` : ''}.`;
    return this.summary;
  }
});

// console.log(`I am ${newObj.name}. I have ${newObj.friends.length} friends and ${newObj.friends[0]} is my bestfriend.`);
newObj.calcAge();
newObj.getSummary();
// console.log(newObj.age);
// console.log(newObj.summary);


// --------------- Temp amplitude calculator

const tempArr = [-2, 11, 4, 18, 22, 'error', 35, 6, 29, -3];

const calcTempAmpl = function (t1, t2) {
  const mergedArr = t1.concat(t2);

  let max = mergedArr[0];
  let min = mergedArr[0];

  for (i = 1; i < mergedArr.length; i++) {
    const arrItem = mergedArr[i];
    if (arrItem === 'error') continue;
    max = arrItem > max ? arrItem : max;
    min = arrItem < min ? arrItem : min;
  }

  return max - min;
};

// console.log(calcTempAmpl(tempArr));

// ----------------- temp forecast

const printForecast = function (arr) {
  let forecastStr = '';

  for (let i = 0; i < arr.length; i++) {
    forecastStr += `... ${arr[i]}°C in ${i + 1} days `;
  }

  return forecastStr;
};

const tempArr2 = [26, 22, 17, 32];

console.log(printForecast(tempArr2));

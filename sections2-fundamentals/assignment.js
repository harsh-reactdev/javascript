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

for(i =0; i<str.length; i++){
  occ[str[i]] = Object.keys(occ).includes(str[i]) ? ++occ[str[i]] : 1;
}

// console.log(occ);


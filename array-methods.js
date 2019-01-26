

var dataset = require('./dataset.json');

const bankBalanceData = dataset.bankBalances;
// console.log(bankBalanceData);

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = null;
const filterBalance = (arr, num) => {
  return arr.filter(x => x.amount > num);
};
hundredThousandairs = filterBalance(bankBalanceData, 100000);

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = null;
const sumBalance = (arr) => {
  return arr.map(x => parseInt(x.amount)).reduce((accum, currVal) => (accum + currVal))
};

sumOfBankBalances = sumBalance(bankBalanceData);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */
var sumOfInterests = null;
const stateList = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];

const newStateArr = (arr1, arr2) => {
  return arr1.filter(x => arr2.includes(x.state));
};

const getInterest = (arr, num) =>{
  return arr.map(x => Math.round(x.amount * num));
}

sumOfInterests = Math.round(getInterest(newStateArr(bankBalanceData, stateList), .189).reduce((accum, currVal) => accum + currVal));

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var stateSums = null;

const hashTable = (arr) =>{
  let newObj = {};
  arr.forEach(x => {
    if(newObj.hasOwnProperty(x.state)){
      newObj[x.state] += Math.round(parseInt(x.amount));
    }else{
      newObj[x.state] = parseInt(x.amount);
    }
  });
    return newObj;
};

stateSums = hashTable(bankBalanceData);

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var sumOfHighInterests = null;
const stateArr = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];

let newObj = {};

bankBalanceData.forEach(x => {
  if(!stateArr.includes(x.state)){
    if(newObj.hasOwnProperty(x.state)){
    newObj[x.state] += Math.round(parseInt(x.amount, 10));
    }else{
      newObj[x.state] = parseInt(x.amount, 10);
    }
  }
});

let newArr = Object.values(newObj);
sumOfHighInterests = newArr.map(x => Math.round(parseInt(x, 10) * .189)).filter(x => x > 50000).reduce((accum, currVal) => (accum + currVal));



/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;
const newLowerSSHash = hashTable(bankBalanceData);
const newLowerSumArr = Object.entries(newLowerSSHash);
lowerSumStates = newLowerSumArr.filter(x => x[1] < 1000000)
              .map(x => x[0]);


// Object.entries(newLowerSSHash).forEach(x => {
//   if(x[1] > 1000000){
//     newLowerSumArr.push(x[2]);
//   }
// })
// console.log(newLowerSumArr)
// lowerSumStates = newLowerSumArr;


/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;
const newHighHash = hashTable(bankBalanceData)
higherStateSums = Object.entries(newHighHash).filter(x => x[1] > 1000000).map(x => x[1]).reduce((accum, currVal) => (accum + currVal));


/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;
const newStatesHighSum = hashTable(bankBalanceData);
stateArr.forEach(x => {
  if (newStatesHighSum[x] > 2550000){
    areStatesInHigherStateSum = true;
  }else{
    areStatesInHigherStateSum = false;
    return;
  };
});


/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;
const newAnyState = hashTable(bankBalanceData);
const setAnyState = Object.entries(newAnyState).filter(x => stateArr.includes(x[0]) && x[1] > 2550000);

if(setAnyState){
  anyStatesInHigherStateSum = true;
}else{
  anyStatesInHigherStateSum = false;
};


module.exports = {
  hundredThousandairs : hundredThousandairs,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};

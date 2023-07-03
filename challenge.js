'use strict';

// Code Challenge #1
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaNew = dogsJulia.slice(' ');
  dogsJuliaNew.splice(0, 1);
  dogsJuliaNew.splice(-2);

  const both = [...dogsJuliaNew, ...dogsKate];
  // console.log(both);

  both.forEach((dogs, i) => {
    const dogAge = dogs >= 3 ? 'an adult' : 'a puppy';
    //   console.log(`Dog number ${i + 1} is ${dogAge} and is ${dogs} years old`);
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

/////////////////////////
// Code Challenge #2

// const calcAverageHumanAge = function (ages) {
//     const humanAge = ages.map(age => (age <= 2) ? 2*age : 16 + age * 4)
//     // console.log(humanAge);
//     const adults = humanAge.filter(age => age > 18);
//     // console.log(humanAge);
//     // console.log(adults);

//     // const average = adults.reduce((acc, age) =>  acc + age, 0) / adults.length;
//     // return average;
//     const average = adults.reduce((acc, age, i, arr) =>  acc + age/arr.length, 0);
//     return average;

// }
// const avg1  =  calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2  =  calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1);
// console.log(avg2);

///////////////////////
// Code Challenge #3

const calcAverageHumanAge = ages => 
   ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);


const avg1  =  calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2  =  calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1);
// console.log(avg2);
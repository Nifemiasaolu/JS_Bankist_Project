'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//================== MOVEMENTS ==================
const displayMovement = function (movements) {
  containerMovements.innerHTML = ''; //empties html contents that existed before.

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;
    // Displays details on the webpage
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovement(account1.movements);

//=========== Summary Amount===========
const displaySummary = function (movements) {

//  incomes
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  // Outgoings
  const outgoing = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outgoing)}€`;

  // Interest 
  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account1.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
displaySummary(account1.movements);

//========= Username Creation ==========
const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
// console.log(accounts);

//========= Calculate balance =========
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
};
calcDisplayBalance(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////

//========== ARRAY METHODS ==========

// let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE

// console.log(arr.slice(2));
// console.log(arr.slice(1,4));
// console.log(arr.slice(1,-2));
// console.log(arr.slice()); //duplicates the array
// console.log([...arr]);

// SPLICE
// console.log(arr.splice(2));
// arr.splice(-1);
// console.log(arr);

// REVERSE It's a mutating method
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// JOIN
// console.log(letters.join(' - '));

//=========== AT METHOD ===========

// const arr = [67, 84, 42];
// console.log(arr[0]);
// console.log(arr.at(0));

// Getting last array element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// console.log('Jonas'.at(0));
// console.log('Jonas'.at(-1));

//========== Data Transformation (Map, Reduce, Filter) ==========
//======= Map Method =======
// Map method is used to carry out functions/transactions and give out output in a new array

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;
// const movementUsd = movements.map(mov => mov * eurToUsd );
// console.log(movements);
// console.log(movementUsd);

const movementDescription = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
// console.log(movementDescription);

// const totalMovement = function(acc) {
//    accs.forEach(movements.map(acc))
// }
// totalMovement(account1.movements);

//========= Filter Method =========
// Filter method is used to set conditions and filter what is and isn't needed.
const deposits = movements.filter(mov => mov > 0);
// console.log(movements);
// console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

//========= Reduce method =========
// Reduce method compiles all the element values into one

// Accumulator is used to add them all together and produce balance
// const balance = movements.reduce((acc, cur) => acc + cur, 0); // 0 means the acc starts from 0
// console.log(balance);

// Maximum Vaue using Reduce Method
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
// console.log(max);

// NOTE: FILTER and MAP returns an Array, while REDUCE returns a value

//========== Chaining Method ==========
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0) //how to check for bugs in the chaining methods;
  // .map((mov, i, arr) => { //You check it in the next method that's being executed;
  //  console.log(arr);
  // return mov * eurToUsd
  // })
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

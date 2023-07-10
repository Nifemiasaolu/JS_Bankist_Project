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

const transferErrorMessage = document.querySelector('.error__message');
const loginErrorMessage = document.querySelector('.display-error');
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
const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = ''; //empties html contents that existed before.

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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

//===================== Summary Amount=====================
const displaySummary = function (acc) {
  //  incomes
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  // Outgoings
  const outgoing = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outgoing)}€`;

  // Interest Rate
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//======================= Calculate balance =======================
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

//====================== Username Creation =======================
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

const updateUI = function (acc) {
  //Display Movements
  displayMovement(acc.movements);

  //Display Balance
  calcDisplayBalance(acc);

  //Display Summary
  displaySummary(acc);
};

///////////////////////////////////////////////////
//======================= Event Handlers =======================
let currentAccount;

//============= Login Function =============
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  // Pin Setup
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //currentAccount?.pin means to check if currentAccount exist first,
    //if it does, proceed to confirming the pin.

    // Display UI and Welcome Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    loginErrorMessage.style.display = 'none';

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    transferErrorMessage.style.display = 'none';

    // Update UI
    updateUI(currentAccount);
  } else {
    loginErrorMessage.style.display = 'block';
    const timeout = setTimeout(() => {
      loginErrorMessage.textContent = `Invalid Username/Password`;
    }, 100);
    loginErrorMessage.style.color = 'red';
    // clearTimeout(timeout);
  }
});

//=============== Transfer Function ===============
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  // Transfer condition
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);

    // Remove input content
    inputTransferTo.value = inputTransferAmount.value = '';
    inputTransferAmount.blur();

    transferErrorMessage.style.display = 'block';
    transferErrorMessage.textContent = `Transaction Succesful`;
    transferErrorMessage.style.color = 'green';

    //clearTimeout(timeout, 3000);
  } else {
    // Display error message
    transferErrorMessage.style.display = 'block';
    transferErrorMessage.textContent = `Invalid Transaction`;
    transferErrorMessage.style.color = 'red';
  }
});

//================ Loan Function ================
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    // Add Movement
    currentAccount.movements.push(loanAmount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

//================ Close Account Function ================
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
});

//================ Sort Function ================
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});
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
// console.log(totalDepositsUSD);

//============ The Find Method ============
// The find method loops over the array and gets an element in the array
// It returns the first element that meets its condition
const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(firstWithdrawal);
// console.log(movements);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

for (const acc of accounts) {
  acc.owner === 'Jessica Davis';
}
// console.log(acc);

//=============== Some and Every Method ===============

// console.log(movements);

// EQUALITY
// console.log(movements.includes(-130));

// SOME: CONDITION
const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

const anyDeposits2 = movements.some(mov => mov > 1500);
// console.log(anyDeposits2);

// EVERY: CONDITION
// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// Seperate Callback
const deposit5 = mov => mov > 0;
// console.log(movements.some(deposit5));
// console.log(movements.filter(deposit5));
// console.log(movements.every(deposit5));

//============= Flat Method ===============
const arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
// console.log(arr.flat());

const arr2 = [
  [1, [2, 3]],
  [4, [5, 6]],
  [7, [8, 9]],
];
// console.log(arr2.flat());

// Flat
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);
// console.log(overallBalance);

// FlatMap
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);
// console.log(overallBalance2);

//============= Sorting Method ==============
// Strings
const owners = ['Jonas', 'Michael', 'Adam', 'Zach'];
// console.log(owners.sort());
// console.log(owners);

// Numbers
// console.log(movements);

// return < 0, A, B; (keep order)
// return > 0, B, A; (switch order)
// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < a) return -1;
// });
// console.log(movements);
movements.sort((a, b) => a - b);
// console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < a) return 1;
// });
// console.log(movements);
movements.sort((a, b) => b - a);
// console.log(movements);

//========= Creating and Filling Arrays =========
const arr3 = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty Arrays + Fill Method
const x = new Array(7);
x.fill(1);
x.fill(2, 3, 5);
// console.log(x);

arr3.fill(23, 2, 6);
// console.log(arr3);

// To create an array programatically, use array.from method
// Array.from Method

const y = Array.from({ length: 7 }, () => 2);
// console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// 100 dice rolls

const dice = Array.from(
  { length: 100 },
  () => Math.trunc(Math.random() * 6) + 1
);
// console.log(dice);

// Converting the generated movements values into an array using Array.from
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  // console.log(movementsUI);
});

// Practice Exercise

const { deposit, withdrawal } = accounts
  .flatMap(mov => account.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposit += cur) : (sums.withdrawal += cur);
      sums[cur > 0 ? 'deposit' : 'withdrawal'] += cur;
      return sums;
    },
    { deposit: 0, withdrawal: 0 }
  );
console.log(deposit, withdrawal);

// Title Case Capitalisation
// this is a nice titile => This Is a Nice Title

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1)
  
  const exceptions = ['a', 'an', 'and', 'but', 'the', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => exceptions.includes(word) ? word : capitalize(word))
    .join(' ');
    
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title, but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

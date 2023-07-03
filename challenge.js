'use strict';

const checkDogs = function(dogsJulia, dogsKate) {
    const dogsJuliaNew = dogsJulia.slice(' ');
    dogsJuliaNew.splice(0,1);
    dogsJuliaNew.splice(-2);
    
    const both = [...dogsJuliaNew, ...dogsKate];
    // console.log(both);

    both.forEach((dogs, i) => {
       const dogAge = (dogs >= 3) ? 'an adult' : 'a puppy';
    //   console.log(`Dog number ${i + 1} is ${dogAge} and is ${dogs} years old`);
    })
    
}
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);



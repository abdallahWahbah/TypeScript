// functions, callback

// Function as type
let combine: Function;
// you can customize the function
let combineNumbers: (a: number, b: number) => number;

const add = (num1: number, num2: number) =>
{
  return num1 + num2;
}


combineNumbers = add;
combine = add;

console.log(combine(2, 3));
console.log(combineNumbers(15, 15));


// using callback
const addHandleCallback = (a: number, b: number, callbackFunction: (num: number) => void) =>
{
  const result = a + b;
  callbackFunction(result)
}

addHandleCallback(10, 90, (result) => {console.log(result)})
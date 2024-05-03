// functions, callback
// Function as type
var combine;
// you can customize the function
var combineNumbers;
var add = function (num1, num2) {
    return num1 + num2;
};
combineNumbers = add;
combine = add;
console.log(combine(2, 3));
console.log(combineNumbers(15, 15));
// using callback
var addHandleCallback = function (a, b, callbackFunction) {
    var result = a + b;
    callbackFunction(result);
};
addHandleCallback(10, 90, function (result) { console.log(result); return true; });

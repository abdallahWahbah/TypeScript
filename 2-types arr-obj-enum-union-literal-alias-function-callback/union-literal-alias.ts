// union types, literal types, alias / custom type

// to accept 2 different types of values, we use union types >>> to tell ts we are fine with (for example) numbers or strings
// literal types: to assign certain values instead of types

type Combinable = number | string;

const combine = (
    input1: number | string, 
    input2: Combinable, // the same as the above live 
    resultConversion: 'as-number' | 'as-text'
) => 
{
  if(resultConversion === "as-number") return +input1 + +input2;
  else return input1.toString() + input2.toString();
}

const combinedNumbers = combine(2, 4, "as-number");
console.log(combinedNumbers)

const combinedAges = combine("2", "4", "as-number");
console.log(combinedAges)

const combinedNames = combine("Abdallah", "Wahbah", "as-text");
console.log(combinedNames)

// literal types: to assign certain values instead of types >>>> name: 'abdo'
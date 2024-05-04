// interface describes the structure of an object
interface Named
{
    name: string;
    outputName?: string; // "?" to tell that outputName is optional for implementaion >>> no error 
}

interface Greetable extends Named
{
    readonly carType: string; // can't be changed after initialization
    greet(message: string): void
}

class Person implements Greetable
{
    name: string;
    age: number;
    carType: string;
    constructor(n: string)
    {
        this.name = n;
        this.age = 26;
        this.carType = "BMW"
    }
    greet(phrase: string) {
        console.log(phrase + this.name);
    }
}

const user1 = new Person("Anna");
user1.greet("Hello: ")

let abdallah: Greetable;
abdallah = {
    name: "Abdallah",
    carType: "Mercedes",
    greet(phrase)
    {
        console.log(phrase + this.name);
    }
}
abdallah.greet("hello from: ")

// it is okay to assign Person to Greetable variable cause it implements it 
let user2: Greetable;
user2 = new Person("Wahbah");
user2.greet("hello from: ")
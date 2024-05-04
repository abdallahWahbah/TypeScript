"use strict";
class Person {
    constructor(n) {
        this.name = n;
        this.age = 26;
        this.carType = "BMW";
    }
    greet(phrase) {
        console.log(phrase + this.name);
    }
}
const user1 = new Person("Anna");
user1.greet("Hello: ");
let abdallah;
abdallah = {
    name: "Abdallah",
    carType: "Mercedes",
    greet(phrase) {
        console.log(phrase + this.name);
    }
};
abdallah.greet("hello from: ");
// it is okay to assign Person to Greetable variable cause it implements it 
let user2;
user2 = new Person("Wahbah");
user2.greet("hello from: ");

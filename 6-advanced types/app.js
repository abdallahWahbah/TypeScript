"use strict";
var _a;
const emp1 = {
    name: "Abdallah",
    privileges: ["priv 1", "priv 2"],
    startDate: new Date()
};
let uni1 = 1; // only number
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
const printEmployeeInfo = (emp) => {
    if ("privileges" in emp) // if "privileges" exists in emp as property
     {
        console.log("privileges" + emp.privileges);
    }
    if ("startDate" in emp) // if "startDate" exists in emp as property
     {
        console.log("privileges" + emp.startDate);
    }
};
printEmployeeInfo({ name: "Abdallah", privileges: ["sad", "asd"], startDate: new Date() });
class Car {
    drive() {
        console.log("Driving a car!");
    }
}
class Truck {
    drive() {
        console.log("Driving a Truck!");
    }
    loadCargo(amount) {
        console.log("Loading a cargo" + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
const useVehicle = (vehicle) => {
    if (vehicle instanceof Car) // you can use "in" as if it was an object 
     {
        vehicle.drive();
    }
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(22);
    }
};
const moveAnimal = (animal) => {
    let speed;
    switch (animal.type) // you can use "in" and ignore delete in from the interfaces
     {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log("Speed: " + speed);
};
moveAnimal({ type: "bird", flyingSpeed: 22 });
moveAnimal({ type: "horse", runningSpeed: 36 });
// ------------------------Type Castin
// 2 ways
const userInput = document.querySelector("input");
const errors = { name: "Email not valid", userName: "Must start with a capital letter" };
// optional chaining
const fetchUserData = {
    id: "u1",
    name: "Wahbah",
    job: { jobName: "Programmer" }
};
console.log((_a = fetchUserData === null || fetchUserData === void 0 ? void 0 : fetchUserData.job) === null || _a === void 0 ? void 0 : _a.jobName);
// ------------------------ nullish coalescing
const userInputHahaha = "";
console.log(userInputHahaha || "Default"); // "Default"
// if we wanted to keep the output as "", user ??
console.log(userInputHahaha !== null && userInputHahaha !== void 0 ? userInputHahaha : "Default"); // ""

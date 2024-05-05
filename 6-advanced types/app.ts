// Intersection types
type Admin = {
    name: string;
    privileges: string[];
}
type Employee = {
    name: string;
    startDate: Date;
}
type EvaluatedEmployee = Admin & Employee;

const emp1: EvaluatedEmployee = {
    name: "Abdallah",
    privileges: ["priv 1", "priv 2"],
    startDate: new Date()
}

// ------------- another example using union
type Combinale = number | string;
type Numeric = number | boolean;
type Universal = Combinale & Numeric;

let uni1: Universal = 1 // only number

// ------------------------ type guards using typeof, "in", instanceof, discriminated unions

// overloading
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinale, b: Combinale)
{
    if(typeof a === "string" || typeof b === "string")
    {
        return a.toString() + b.toString();
    }
    return a + b;
}

type UnknownEmployee = Admin | Employee;

const printEmployeeInfo = (emp: UnknownEmployee) =>
{
    if("privileges" in emp) // if "privileges" exists in emp as property
    {
        console.log("privileges" + emp.privileges)
    }
    if("startDate" in emp) // if "startDate" exists in emp as property
    {
        console.log("privileges" + emp.startDate)
    }
}

printEmployeeInfo({name: "Abdallah", privileges: ["sad", "asd"], startDate: new Date()})

class Car
{
    drive()
    {
        console.log("Driving a car!")
    }
}
class Truck
{
    drive()
    {
        console.log("Driving a Truck!")
    }
    loadCargo(amount: number)
    {
        console.log("Loading a cargo" + amount)
    }
}
type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) =>
{
    if(vehicle instanceof Car) // you can use "in" as if it was an object 
    {
        vehicle.drive()
    }
    if(vehicle instanceof Truck)
    {
        vehicle.loadCargo(22);
    }
}


// ------------------------ Discriminated unions

interface Bird
{
    type: "bird";
    flyingSpeed: number;
}
interface Horse
{
    type: "horse";
    runningSpeed: number;
}
type Animal = Bird | Horse;

const moveAnimal = (animal: Animal) =>
{
    let speed
    switch(animal.type) // you can use "in" and ignore delete in from the interfaces
    {
        case "bird":
            speed = animal.flyingSpeed
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log("Speed: " + speed)
}
moveAnimal({type: "bird", flyingSpeed: 22})
moveAnimal({type: "horse", runningSpeed: 36})

// ------------------------Type Castin
// 2 ways
const userInput = <HTMLInputElement> document.querySelector("input")
// const userInput = document.querySelector("input")! as HTMLInputElement
// userInput.value = "abdalla"


// ------------------------ Index properties

// we want to make an interface that holds an error message
// bu twe don't know the key of the error message and how many errors will be
interface ErrorContainer // {email: "Email not valid", userName: "Must start with a capital letter"}
{
    // [prop: string] >>>>> I don't know the property name nor the property count
    [prop: string]: string;
}

const errors = {name: "Email not valid", userName: "Must start with a capital letter"}

// optional chaining
const fetchUserData = {
    id: "u1",
    name: "Wahbah",
    job: {jobName: "Programmer"}
}

console.log(fetchUserData?.job?.jobName)

// ------------------------ nullish coalescing
const userInputHahaha = "";
console.log(userInputHahaha || "Default" ) // "Default"
// if we wanted to keep the output as "", user ??
console.log(userInputHahaha ?? "Default") // ""
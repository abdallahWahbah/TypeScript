// -------------------------------- Generic functions --------------------------------
// -------- Built-in generic types
const names: string[] = ["Abdallah", "Mahmoud"];
const namesWithGenericType: Array<string> = ["Abdallah", "Mahmoud"]; // both are the same

// -------- Generic function with constraints
function merge<T extends object, U extends object>(obj1: T, obj2: U) 
{
    // return intersection >>> T & U
    // T extends object (this is called constraints >>> optional) >>>> T must be an object
    return Object.assign(obj1, obj2);
}
const mergeObj = merge({name: "Abdallah", hobbies: ["sport", "reading"]}, {age: 26});
console.log(mergeObj.name, mergeObj.age, mergeObj.hobbies)

// -------- Another generic function
interface Lengthy{
    length: number;
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] // T has to have length property
{
    let description = "Got no value."
    description = element.length > 1 ? ("Got " + element.length + " elements.") : ("Got 1 element.")
    return [element, description]
}

console.log(countAndDescribe("hi there!"));
console.log(countAndDescribe(["cokking", "banana"]));

// -------- keyof
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U)
{
    // the key param has to be a key in the object
    return obj[key];
}
console.log(extractAndConvert({name: "Abdallah"}, "name"))

// -------------------------------- Generic Classes --------------------------------
class DataStorage<T extends string | number | boolean> // "T" can be one of these types only
{
    private data: T[] = [];
    
    addItem(item: T)
    {
        this.data.push(item);
    }
    removeItem(item: T)
    {
        if(this.data.indexOf(item) === -1) return;
        this.data.splice(this.data.indexOf(item), 1)
    }
    getItems()
    {
        return this.data;
    }
}
const dataStorage = new DataStorage<string>();
dataStorage.addItem("Max");
dataStorage.addItem("Manu");
dataStorage.removeItem("Max");
console.log(dataStorage.getItems())

const dataStorage2 = new DataStorage<number>();
dataStorage2.addItem(1);
dataStorage2.addItem(2);
console.log(dataStorage2.getItems())

// -------- Partial
// Partial: to tell TS that the value can be empty initially
interface CourseGoal
{
    title: string;
    description: string;
    completeUntil: Date;
}
function createCourseGoal(title: string, description: string, completeUntil: Date): CourseGoal
{
    let courseGoal: Partial<CourseGoal>= {}
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;
    return courseGoal as CourseGoal;
}
// -------- Read only
const newNames: Readonly<string[]> = ["Anna", "Max"];
// newNames.push("asdasd") // error
// newNames.pop(); // error

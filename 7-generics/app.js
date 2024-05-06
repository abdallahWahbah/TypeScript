"use strict";
// -------------------------------- Generic functions --------------------------------
// -------- Built-in generic types
const names = ["Abdallah", "Mahmoud"];
const namesWithGenericType = ["Abdallah", "Mahmoud"]; // both are the same
// -------- Generic function with constraints
function merge(obj1, obj2) {
    // return intersection >>> T & U
    // T extends object (this is called constraints >>> optional) >>>> T must be an object
    return Object.assign(obj1, obj2);
}
const mergeObj = merge({ name: "Abdallah", hobbies: ["sport", "reading"] }, { age: 26 });
console.log(mergeObj.name, mergeObj.age, mergeObj.hobbies);
function countAndDescribe(element) {
    let description = "Got no value.";
    description = element.length > 1 ? ("Got " + element.length + " elements.") : ("Got 1 element.");
    return [element, description];
}
console.log(countAndDescribe("hi there!"));
console.log(countAndDescribe(["cokking", "banana"]));
// -------- keyof
function extractAndConvert(obj, key) {
    // the key param has to be a key in the object
    return obj[key];
}
console.log(extractAndConvert({ name: "Abdallah" }, "name"));
// -------------------------------- Generic Classes --------------------------------
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1)
            return;
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return this.data;
    }
}
const dataStorage = new DataStorage();
dataStorage.addItem("Max");
dataStorage.addItem("Manu");
dataStorage.removeItem("Max");
console.log(dataStorage.getItems());
const dataStorage2 = new DataStorage();
dataStorage2.addItem(1);
dataStorage2.addItem(2);
console.log(dataStorage2.getItems());
function createCourseGoal(title, description, completeUntil) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;
    return courseGoal;
}
// -------- Read only
const newNames = ["Anna", "Max"];
// newNames.push("asdasd") // error
// newNames.pop(); // error

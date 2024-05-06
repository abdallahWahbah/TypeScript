"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// (decorator and the constructor from the decorator) are executed before the class 
// all decorators can be executed without instanciating an object of the class
const Logger = (logString) => {
    console.log("LOGGER FACTORY");
    return (constructor) => {
        console.log(logString);
        console.log(constructor);
    };
};
const RenderElement = (template, elementClassName) => {
    console.log("TEMPLATE FACTORY"); // 
    return (constructor) => {
        let element = document.querySelector(elementClassName);
        const person1 = new constructor();
        element.innerHTML = template; // not working >>> documen.querySelector of anything is null
        element.textContent = person1.name; // not working
        console.log("decorator functions: ", person1);
    };
};
// execution of decorator factories happen(when there is multiple decorators) from bottom to top >>> log >> LOGGER FACTORY >>> TEMPLATE FACTORY
// execution of decorator function happen(when there is multiple decorators) from bottom to top
let Person = class Person {
    constructor() {
        this.name = "Abdallah";
        console.log("Creating Person Object");
    }
};
Person = __decorate([
    Logger("LOGGING - PERSON"),
    RenderElement("<h1>Hello from the other side</h1>", ".id")
], Person);
// const person1 = new Person();
// console.log(person1)
// ------------------------------------ property decorator
const Log = (target, name) => {
    console.log("Property decorator");
    console.log(target, name); // property name
};
// ------------------------------------ Accessor decorator
const Log2 = (targer, name, descriptor) => // 3rd param is for setter and getter
 {
    console.log("Accessor decorator");
    console.log(targer, name, descriptor); // name of the accessing function
};
// ------------------------------------ Method decorator
const Log3 = (targer, name, descriptor) => {
    console.log("Method decorator");
    console.log(targer, name, descriptor); // name of the method
};
// ------------------------------------ Parameter decorator
const Log4 = (targer, name, parameterIndex) => {
    console.log("Parameter decorator");
    console.log(targer, name, parameterIndex); // name of the method that has the parameter
};
class Product {
    constructor(title, price) {
        this.title = title;
        this._price = price;
    }
    set price(p) {
        this._price = p;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
// ------------------------------------ auto bind decorator example
// we can make a decorator to auto bind 
const AutoBind = (target, name, descriptor) => {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        }
    };
    return adjustedDescriptor;
};
class Printer {
    constructor() {
        this.message = "it works";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    AutoBind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector("button");
// button.addEventListener("click", () => p.showMessage())
// button.addEventListener("click", p.showMessage.bind(p))
button.addEventListener("click", p.showMessage);
const registeredValidators = {};
const Required = (target, propName) => {
    var _a, _b;
    // registeredValidators[target.constructor.name] = {
    //     [propName]: ["required"]
    // }
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'required'] });
};
const PositiveNumber = (target, propName) => {
    var _a, _b;
    // registeredValidators[target.constructor.name] = {
    //     [propName]: ["positive"]
    // }
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'positive'] });
};
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector("form");
courseForm.addEventListener("submit", event => {
    event.preventDefault();
    const titleElement = document.querySelector("#title");
    const priceElement = document.querySelector("#price");
    const title = titleElement === null || titleElement === void 0 ? void 0 : titleElement.value;
    const price = +priceElement.value;
    const newCourse = new Course(title, price);
    if (!validate(newCourse)) {
        alert("invalid input");
        return;
    }
    console.log(newCourse);
});

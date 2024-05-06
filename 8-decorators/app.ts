// (decorator and the constructor from the decorator) are executed before the class 
// all decorators can be executed without instanciating an object of the class
const Logger = (logString: string) =>
{
    console.log("LOGGER FACTORY")
    return (constructor: Function) =>
    {
        console.log(logString);
        console.log(constructor);
    }
}

const RenderElement = (template: string, elementClassName: string) =>
{
    console.log("TEMPLATE FACTORY") // 
    return (constructor: any) =>
    {
        let element = document.querySelector(elementClassName)!;
        const person1 = new constructor();
        element.innerHTML = template; // not working >>> documen.querySelector of anything is null
        element.textContent = person1.name; // not working
        console.log("decorator functions: ", person1)
    }
}
// execution of decorator factories happen(when there is multiple decorators) from bottom to top >>> log >> LOGGER FACTORY >>> TEMPLATE FACTORY
// execution of decorator function happen(when there is multiple decorators) from bottom to top

@Logger("LOGGING - PERSON")
@RenderElement("<h1>Hello from the other side</h1>", ".id")
class Person
{
    name="Abdallah";

    constructor()
    {
        console.log("Creating Person Object");
    }
}

// const person1 = new Person();
// console.log(person1)

// ------------------------------------ property decorator
const Log = (target: any, name: string) =>
{
    console.log("Property decorator");
    console.log(target, name) // property name
}
// ------------------------------------ Accessor decorator
const Log2 = (targer: any, name: string, descriptor: PropertyDescriptor) =>// 3rd param is for setter and getter
{
    console.log("Accessor decorator");
    console.log(targer, name, descriptor); // name of the accessing function
}
// ------------------------------------ Method decorator
const Log3 = (targer: any, name: string, descriptor: PropertyDescriptor) =>
{
    console.log("Method decorator");
    console.log(targer, name, descriptor); // name of the method
}
// ------------------------------------ Parameter decorator
const Log4 = (targer: any, name: string, parameterIndex: number) =>
{
    console.log("Parameter decorator");
    console.log(targer, name, parameterIndex); // name of the method that has the parameter
}

class Product
{
    @Log
    title: string;
    private _price: number;

    constructor(title: string, price: number)
    {
        this.title = title
        this._price = price;
    }

    @Log2
    set price(p: number)
    {
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number)
    {
        return this._price * (1 + tax);
    }
}

// ------------------------------------ auto bind decorator example
// we can make a decorator to auto bind 
const AutoBind = (target: any, name: string, descriptor: PropertyDescriptor) =>
{
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get()
        {
            return originalMethod.bind(this);
        }
    }
    return adjustedDescriptor;
}
class Printer
{
    message: string = "it works";

    @AutoBind
    showMessage()
    {
        console.log(this.message);
    }
}

const p = new Printer();
const button = document.querySelector("button")!;
// button.addEventListener("click", () => p.showMessage())
// button.addEventListener("click", p.showMessage.bind(p))
button.addEventListener("click", p.showMessage)


// ------------------------------------ Validation with decorators 
//(ignore) use the following librarys instead

// validation: class-validator

// https://github.com/typestack/class-validator?tab=readme-ov-file#usage

interface ValidatorConfig
{
    [property: string]: {
        [validatableProp: string]: string[] // ["required", "positive"]
    }
}
const registeredValidators: ValidatorConfig = {}

const Required = (target: any, propName: string) =>
{
    // registeredValidators[target.constructor.name] = {
    //     [propName]: ["required"]
    // }
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    };
}
const PositiveNumber = (target: any, propName: string) =>
{
    // registeredValidators[target.constructor.name] = {
    //     [propName]: ["positive"]
    // }
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    };
}
function validate(obj: any) {
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
  

class Course
{
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(title: string, price: number)
    {
        this.title = title;
        this.price = price;
    }
}


const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", event =>
{
    event.preventDefault();
    const titleElement = document.querySelector("#title") as HTMLInputElement
    const priceElement = document.querySelector("#price") as HTMLInputElement

    const title = titleElement?.value;
    const price = + priceElement.value;

    const newCourse = new Course(title, price);
    if(!validate(newCourse))
    {
        alert("invalid input")
        return;
    }
    console.log(newCourse)
})

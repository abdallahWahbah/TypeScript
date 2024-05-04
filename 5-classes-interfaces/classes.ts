abstract class Department
{
    // private readonly id: string; // >>> readonly is just like const (initialze and can't modify it) introduced by ts not js 
    // public name: string; // default access modifier is public
    protected employees: string[] = []; // accissable only by this class and classes that inherite from it
    static currentYear = new Date(); // static property only accissable from a static method >> or ClassName.staticProperty

    constructor(private readonly id: string, public name: string)
    {
        // this.name = name;
        // this.id = id
    }

    describe(this: Department) // to make sure that "this" will always refer to an instance of the Department class
    {
        console.log("Department { id: " + this.id+", name: " + this.name+" }")
        // console.log(Department.currentYear)
    }

    abstract description(this: Department): void; // to force all classes that inherite this class to implement this method

    addEmployee(emp: string)
    {
        this.employees.push(emp);
    }

    printEmployees()
    {
        console.log(this.employees.length)
        console.log(this.employees)
    }
    static createEmployee(name: string)
    {
        console.log(this.currentYear)
        return {name: name};
    }
}

class ITDepartment extends Department
{
    admins: string[];
    constructor(id: string, admins: string[])
    {
        super(id, "IT");
        this.admins = admins;
    }

    description() {
        console.log("ITDepartment: this is an abstract method from the parent class, we need to implement it")
    }
}

class AccountingDepartment extends Department
{
    private lastReport: string;
    private static instance: AccountingDepartment;

    private constructor(id: string, private reports: string[])
    {
        super(id, "Accounting");
        this.lastReport = reports[0];
    }

    // singleton pattern: to ensure that we can create only one instance of this class (with private constructor)
    static getInstance()
    {
        if(AccountingDepartment.instance) return this.instance;
        this.instance = new AccountingDepartment("d2", []);
        return this.instance;
    }
    
    addEmployee(emp: string)
    {
        this.employees.push(emp);    
    }

    addReport(report: string)
    {
        this.reports.push(report);
        this.lastReport = report;
    }

    printReports()
    {
        console.log(this.reports);
    }

    // encapsulation
    get mostRecentReport() // getter is accissable as if you access property not a function >>> don't write ()
    {
        if(this.lastReport) return this.lastReport;
        throw new Error("No Reports")
    }
    set mostRecentReport(report: string) // setter is accissable as if you access property not a function >>> don't write ()
    {
        if(!report) throw new Error("put a valid report");
        this.lastReport = report;
    }

    description() {
        console.log("ITDepartment: this is an abstract method from the parent class, we need to implement it")
    }

}

const accounting = new Department("acc", "Accounting");

accounting.describe();

accounting.addEmployee("Abdallah");
accounting.addEmployee("Wahbah");
// accounting.addEmployee.push("Mahmoud"); // error during compilation (ts) not at run time (js)
accounting.printEmployees();
console.log(Department.createEmployee("Anna"), Department.currentYear)


const idDept = new ITDepartment("d1", ["Body", "Mody", "Dody"]);
idDept.addEmployee("Hazem");
console.log(idDept)

// const accDeprt = new AccountingDepartment("acc1", []);
const accDeprt1 = AccountingDepartment.getInstance();
const accDeprt2 = AccountingDepartment.getInstance();
console.log(accDeprt1, accDeprt2) // they are the same cause we used singleton pattern for this class
accDeprt1.addReport("report 1")
accDeprt1.addReport("report 2")
accDeprt1.addEmployee("Yasser")
console.log(accDeprt1)
console.log(accDeprt1.mostRecentReport)
accDeprt1.mostRecentReport = "new report using setter and getter"
console.log(accDeprt1.mostRecentReport)
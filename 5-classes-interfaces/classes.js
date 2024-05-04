"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // private readonly id: string; // >>> readonly is just like const (initialze and can't modify it) introduced by ts not js 
        // public name: string; // default access modifier is public
        this.employees = []; // accissable only by this class and classes that inherite from it
        // this.name = name;
        // this.id = id
    }
    describe() {
        console.log("Department { id: " + this.id + ", name: " + this.name + " }");
        // console.log(Department.currentYear)
    }
    addEmployee(emp) {
        this.employees.push(emp);
    }
    printEmployees() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
    static createEmployee(name) {
        console.log(this.currentYear);
        return { name: name };
    }
}
Department.currentYear = new Date(); // static property only accissable from a static method >> or ClassName.staticProperty
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
    }
    description() {
        console.log("ITDepartment: this is an abstract method from the parent class, we need to implement it");
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[0];
    }
    // singleton pattern: to ensure that we can create only one instance of this class (with private constructor)
    static getInstance() {
        if (AccountingDepartment.instance)
            return this.instance;
        this.instance = new AccountingDepartment("d2", []);
        return this.instance;
    }
    addEmployee(emp) {
        this.employees.push(emp);
    }
    addReport(report) {
        this.reports.push(report);
        this.lastReport = report;
    }
    printReports() {
        console.log(this.reports);
    }
    // encapsulation
    get mostRecentReport() {
        if (this.lastReport)
            return this.lastReport;
        throw new Error("No Reports");
    }
    set mostRecentReport(report) {
        if (!report)
            throw new Error("put a valid report");
        this.lastReport = report;
    }
    description() {
        console.log("ITDepartment: this is an abstract method from the parent class, we need to implement it");
    }
}
const accounting = new Department("acc", "Accounting");
accounting.describe();
accounting.addEmployee("Abdallah");
accounting.addEmployee("Wahbah");
// accounting.addEmployee.push("Mahmoud"); // error during compilation (ts) not at run time (js)
accounting.printEmployees();
console.log(Department.createEmployee("Anna"), Department.currentYear);
const idDept = new ITDepartment("d1", ["Body", "Mody", "Dody"]);
idDept.addEmployee("Hazem");
console.log(idDept);
// const accDeprt = new AccountingDepartment("acc1", []);
const accDeprt1 = AccountingDepartment.getInstance();
const accDeprt2 = AccountingDepartment.getInstance();
console.log(accDeprt1, accDeprt2); // they are the same cause we used singleton pattern for this class
accDeprt1.addReport("report 1");
accDeprt1.addReport("report 2");
accDeprt1.addEmployee("Yasser");
console.log(accDeprt1);
console.log(accDeprt1.mostRecentReport);
accDeprt1.mostRecentReport = "new report using setter and getter";
console.log(accDeprt1.mostRecentReport);

namespace App
{
    // Component Base Class (parent class to ProjectList, ProjectInput)
    export abstract class Component<T extends HTMLElement, U extends HTMLElement>
    { // abstract: class can't be instanciated
        templateElement: HTMLTemplateElement;
        hostElement: T;
        element: U;
    
        constructor(
            templateId: string,
            hostElementId: string,
            insertAtStart: boolean,
            newElementId?: string, // "?" is optional parameter (should always be the last parameter)
        )
        {
            this.templateElement = document.querySelector("#" + templateId)! as HTMLTemplateElement;
            this.hostElement = document.querySelector("#" + hostElementId)! as T;
    
            let importedNode = document.importNode(this.templateElement.content, true) // true: import all nested elements also
            this.element = importedNode.firstElementChild as U;
            if(newElementId) this.element.id = newElementId;
    
            this.hostElement.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element)
    
        }
        abstract configure(): void;
        abstract renderContent(): void
    }
}
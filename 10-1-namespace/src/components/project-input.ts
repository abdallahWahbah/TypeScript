/// <reference path="./base-component.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../util/validation.ts"/>
/// <reference path="../state/project-state.ts"/>

namespace App
{
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>
    {
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;
    
        constructor()
        {
            super("project-input", "app", true, "user-input")
            
            this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;
    
            this.configure();
        }
    
        configure()
        {
            this.element.addEventListener("submit", this.submitHandler)
            // this.element.addEventListener("submit", this.submitHandler.bind(this))
        }
        renderContent(): void {
            
        }
        private gatherInputs(): [string, string, number] | void  // tuple: the return value will be an array of 3 element of these types
        {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            // if(
            //     enteredTitle.trim().length === 0 ||
            //     enteredDescription.trim().length === 0 ||
            //     enteredPeople.trim().length === 0
            // )
            const titleValidatable: Validatable = {
                value: enteredTitle,
                required: true
            }
            const descriptionValidatable: Validatable = {
                value: enteredDescription,
                required: true,
                minLength: 5
            }
            const peopleValidatable: Validatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5
            }
            if(
                !validate(titleValidatable) || 
                !validate(descriptionValidatable) || 
                !validate(peopleValidatable) 
            )
            {
                alert("some input is empty");
                return;
            }
            else return [enteredTitle, enteredDescription, +enteredPeople];
        }
    
        private clearInputs()
        {
            this.titleInputElement.value = "";
            this.descriptionInputElement.value = "";
            this.peopleInputElement.value = "";
        }
    
        @AutoBind
        private submitHandler(event: Event)
        {
            event.preventDefault();
            const userInput = this.gatherInputs();
            if(Array.isArray(userInput))
            {
                const [title, description, people] = userInput;
                projectState.addProject(title, description, people)
                console.log(title, description, people)
                this.clearInputs()
            }
        }
    
    }
}
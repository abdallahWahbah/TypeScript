// Drag & Drop Interfaces
interface Draggable // maybe a peoject item
{
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}
interface DragTarget // maybe a peoject list container
{
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void; // when you finish the drag
    dragLeaveHandler(event: DragEvent): void; // if we canceled the drag and when you leave the drag element
}

// Project Type
enum ProjectStatus{Active, Finished}

class Project
{
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ){}
}

// Project State Management
type Listener<T> = (items: T[]) => void;
class State<T>
{
    protected listeners: Listener<T>[] = [];
    addListener(listenerFn: Listener<T>)
    {
        this.listeners.push(listenerFn);
    }

}

class ProjectState extends State<Project>
{
    private static instance: ProjectState;
    private projects : Project[] = [];

    constructor()
    {
        super()
    }

    // singleton
    static getInstance()
    {
        if(this.instance) return this.instance;
        else 
        {
            this.instance = new ProjectState();
            return this.instance
        }
    }
    addProject(title: string, description: string, numOfPeople: number)
    {
        const newProject = new Project( Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject)
        this.updateListener()
    }

    changeProjectStatus(projectId: string, newStatus: ProjectStatus)
    {
        const project = this.projects.find(proj => proj.id === projectId);
        if(project) 
        {
            project.status = newStatus;
            this.updateListener()
        }
    }
    
    private updateListener()
    {
        for(const listenerFn of this.listeners)
        {
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

interface Validatable
{
    value: string | number;
    required?: boolean;
    minLength?: number; // length of the string, "?" optional property
    maxLength?: number;
    min?: number; // min is a value of number
    max?: number;
}

const validate = (validatableInput: Validatable ) =>
{
    let isValid = true;
    if(validatableInput.required)
    {
        isValid = isValid && (validatableInput.value.toString().trim().length !== 0);
    }
    if(typeof validatableInput.value === "string" && validatableInput.minLength != null)
    {
        isValid = isValid && (validatableInput.value.length >= validatableInput.minLength);
    }
    if(typeof validatableInput.value === "string" && validatableInput.maxLength != null)
    {
        isValid = isValid && (validatableInput.value.length <= validatableInput.maxLength);
    }
    if(typeof validatableInput.value === "number" && validatableInput.min != null)
    {
        isValid = isValid && (validatableInput.value >= validatableInput.min);
    }
    if(typeof validatableInput.value === "number" && validatableInput.max != null)
    {
        isValid = isValid && (validatableInput.value <= validatableInput.max);
    }
    return isValid; 
}

const AutoBind = (target: any, methodName: string, descriptor: any) =>
{
    const originalMethod = descriptor.value;
    const adjustedDescriptor: any = {
        configurable: true,
        get()
        {
            return originalMethod.bind(this);
        }
    }
    return adjustedDescriptor;
}

// Component Base Class (parent class to ProjectList, ProjectInput)
abstract class Component<T extends HTMLElement, U extends HTMLElement>
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

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
                    implements Draggable
{
    private project: Project;

    get persons()
    {
        if(this.project.people === 1) return "1 Person";
        else return `${this.project.people} Persons`
    }

    constructor(hostId: string, project: Project)
    {
        super("single-project", hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @AutoBind
    dragStartHandler(event: DragEvent) 
    {
        event.dataTransfer!.setData("plain/text", this.project.id); // first param is identifier
        event.dataTransfer!.effectAllowed = "move"
    }
    @AutoBind
    dragEndHandler(event: DragEvent) 
    {
        console.log("Drag End")
    }



    configure() 
    {
        this.element.addEventListener("dragstart", this.dragStartHandler) // .bind(this) but we used @AutoBing decorator
        this.element.addEventListener("dragend", this.dragEndHandler) // .bind(this) but we used @AutoBing decorator
    }
    renderContent() 
    {
        this.element.querySelector("h2")!.textContent = this.project.title;
        this.element.querySelector("h3")!.textContent = this.persons + " assigned";
        this.element.querySelector("p")!.textContent = this.project.description;
    }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement>
                    implements DragTarget
{   
    assignedProjects: Project[] = [];

    constructor(private type: "active" | "finished")
    {
        super("project-list", "app", false, `${type}-projects`)
        this.configure();
        this.renderContent();
    }

    @AutoBind
    dragOverHandler(event: DragEvent) 
    {
        if(event.dataTransfer && event.dataTransfer.types[0]==="plain/text")
        {
            event.preventDefault()
            const listEl = this.element.querySelector("ul");
            listEl?.classList.add("droppable")
        }
    }
    @AutoBind
    dragLeaveHandler(event: DragEvent) 
    {
        const listEl = this.element.querySelector("ul");
        listEl?.classList.remove("droppable")
    }
    @AutoBind
    dropHandler(event: DragEvent) 
    {
        const projectId = event.dataTransfer!.getData("plain/text");
        projectState.changeProjectStatus(projectId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
    }

    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj =>
            {
                if(this.type === "active") return prj.status === ProjectStatus.Active;
                return prj.status === ProjectStatus.Finished;
            })
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        })
    }
    renderContent()
    {
        let listId = `${this.type}-projects-list`;
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent = `${this.type.toUpperCase()} PROJECTS`;
        
    }

    private renderProjects()
    {
        const listElement = document.querySelector(`#${this.type}-projects-list`)!
        listElement.innerHTML = ""
        for(const projectItem of this.assignedProjects)
        {
            new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
        }
    }

}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>
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

const projectInput = new ProjectInput();
const projectList1 = new ProjectList("active");
const projectList2 = new ProjectList("finished");

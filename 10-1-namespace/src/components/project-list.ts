/// <reference path="./base-component.ts"/>
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../state/project-state.ts"/>
/// <reference path="../models/project.ts"/>
/// <reference path="../models/drag-drop.ts"/>

namespace App
{
    export class ProjectList extends Component<HTMLDivElement, HTMLElement>
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
}
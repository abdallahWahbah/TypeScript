import { Project, ProjectStatus } from "../models/project";

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

export class ProjectState extends State<Project>
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

export const projectState = ProjectState.getInstance();

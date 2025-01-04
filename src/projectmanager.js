import { Project } from './project.js'; 

export class ProjectManager {
    list_of_projects = []

    addProject (project_name) {
       
        const newProject = new Project(project_name);  // Crlass
        this.list_of_projects.push(newProject);
        
    }

    deleteProject (project) {
        const index = this.list_of_projects.indexOf(project);
    if (index !== -1) {
        this.list_of_projects.splice(index, 1);
    }
    }

    getProjects () {
        return this.list_of_projects
    }
} 

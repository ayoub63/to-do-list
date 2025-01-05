
export class ProjectManager {
    list_of_projects = []
    list_all_todos = []

    addProject (newProject) {
        // Crlass
        this.list_of_projects.push(newProject);
        this.list_all_todos.push(newProject);
        
    }

    addTodo_toProject (project, todo) {
       const right_project = this.list_of_projects.find (p => p.name === project.name);
       if (project) {
        right_project.addTodo(todo)
       }
       
    }

    removeTodo_general(todo) {
        const index = this.list_all_todos.indexOf(todo);
        if (index !== -1) {
            this.projectlist.splice(index, 1);
        }
    }

    addTodoToGeneralList(todo) {
        this.list_all_todos.push(todo); // Add the ToDo to the general list
    }

    get_todos () {
        return this.list_all_todos;
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

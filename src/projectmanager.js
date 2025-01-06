export class ProjectManager {
    list_of_projects = [];
    list_all_todos = [];

    // Add a new project
    addProject(newProject) {
        this.list_of_projects.push(newProject);
    }

    // Add a todo and associate it with a project
    addTodo_toProject(todo) {  
        this.list_all_todos.push(todo);  // Add the todo to the global list
    }

    // Remove a todo from the general list (use the project name to filter)
    deleteTodosByProject(project) {
        // Filter out todos that are associated with the project
        this.list_all_todos = this.list_all_todos.filter(todo => todo.project !== project.name);
    }

    // Delete a project from the global list of projects
    deleteProject(project) {
        const index = this.list_of_projects.indexOf(project);
        if (index !== -1) {
            this.list_of_projects.splice(index, 1);
        }
    }

    get_todos() {
        return this.list_all_todos;
    }

    getProjects() {
        return this.list_of_projects;
    }
}

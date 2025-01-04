export class Project {
    
    project_constructor (name) {
        this.name = name
        this.projectlist = []
    }

    updateName (newName) {
        this.name = newName
    }

    addTodo (todo) {
        this.projectlist.push(todo)
    }

    deleteTodo(todo) {
    const index = this.projectlist.indexOf(todo);
    if (index !== -1) {
        this.projectlist.splice(todo, 1);
    }
}
}
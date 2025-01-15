export class Todo {
    constructor (name , description, project, dueDate, priority, completed) {
        this.name = name
        this.description = description
        this.dueDate =  dueDate
        this.project = project
        this.priority = priority
        this.completed = completed
    }

    updateName (newTitle) {
    this.name = newTitle
   }

   updateDescription (newDescription) {
       this.description = newDescription
    }

    updatePriority (newPriority) {
        this.description = newPriority
     }
    
    toggleCompleted () {
        this.completed = !this.completed
    }

    toJSON() {
        return {
          name: this.name,
          description: this.description,
          project: this.project,
          dueDate: this.dueDate,
          priority: this.priority,  
          completed: this.completed
        };
}
static fromJSON(data) {
    return new Todo(
        data.name,
        data.description,
        data.project,
        new Date(data.dueDate), // Ensure dueDate is a Date object
        data.priority,
        data.completed
    );
}
}
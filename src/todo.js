export class Todo {
    todo_constructor (name , description) {
        this.name = name
        this.description = description
        this.dueDate =  new Date()
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
          title: this.title,
          description: this.description,
          completed: this.completed,
          priority: this.priority,  
          completed: this.completed
        };
}
}
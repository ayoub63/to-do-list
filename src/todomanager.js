import { Todo } from "./todo"
import projectManager from "./projectmanagersingelton";
import { renderAllTodos } from "./todolistdom";

    function createTodo (name , description, dueDate, priority) {
        const todo = new Todo(name , description, dueDate, priority)
    }

    
    // create todo object, add to list
export function createToDo(todoTitle, description, projectName, dueDate, priority) {
    const todo = new Todo(todoTitle, description, projectName, dueDate, priority);

    projectManager.addTodo_toProject(todo);

    renderAllTodos(); // Refresh the todo list
}
    
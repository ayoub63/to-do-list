import { Todo } from "./todo"
import projectManager from "./projectmanagersingelton";
import { renderAllTodos, saveTodos, loadTodos } from "./todolistdom";


    
    
    // create todo object, add to list
export function createToDo(todoTitle, description, projectName, dueDate, priority) {
    const todo = new Todo(todoTitle, description, projectName, dueDate, priority);

    projectManager.addTodo_toProject(todo);
    saveTodos();
    loadTodos(); // Refresh the todo list
}
    
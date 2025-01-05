import { Todo } from "./todo";
import { ProjectManager } from "./projectmanager.js";
const project_Manager = new ProjectManager();

function toggleDialog() {
    const dialog = document.getElementById("todo-dialog");

    if (dialog.open) {
        dialog.close();  // Close the dialog if it's open
    } else {
        dialog.showModal();  // Show the dialog if it's closed
    }
}

function createToDo(todoTitle, description, projectName, dueDate, priority) {
  

    const todo = new Todo(todoTitle, description, projectName, dueDate, priority);
    console.log(todo);

    // Add todo to the general list
    project_Manager.addTodoToGeneralList(todo);

    // Find the target project by name
    const project = project_Manager.getProjects().find(p => p.name === projectName);

    if (project) {
        // Add todo to the specific project
        project_Manager.addTodo_toProject(project, todo);
    }

    renderAllTodos(); // Refresh the todo list
}

function getFormData() {
    const btn = document.getElementById("new-task");
    const form = document.getElementById("todoForm");

    btn.addEventListener("click", () => {
        toggleDialog(); // Toggle the modal dialog
    });

    form.addEventListener("submit", e => {
        e.preventDefault();
        console.log("Form submitted");

        const formData = new FormData(form);
        const todoTitle = formData.get("title-todo");
        const project = formData.get("project-select");
        const priority = formData.get("priority-select");
        const description = formData.get("description");
        const dueDate = formData.get("due-date");

        createToDo(todoTitle, description, project, dueDate, priority);
        toggleDialog();
        form.reset();
    });
}

function renderAllTodos() {
    const todoListContainer = document.querySelector(".todo-list");
    
    // Clear the existing list before rendering (optional)
    todoListContainer.innerHTML = '';

    // Loop through all todos and render each one
    project_Manager.list_all_todos.forEach(todo => {
        renderToDo(todo);
    });
}

// Function to render individual todo
export function renderToDo(todo) {
    const todo_list = document.querySelector(".todo-list");
    const li = document.createElement("li");

    const todo_Title = document.createElement("h3");
    todo_Title.textContent = todo.title;

    const project_text = document.createElement("h4");
    project_text.textContent = todo.project;

    const todo_priority = document.createElement("div");
    todo_priority.textContent = `Priority: ${todo.priority}`;

    const todo_description = document.createElement("p");
    todo_description.textContent = `Description: ${todo.description}`;

    const todo_dueDate = document.createElement("p");
    todo_dueDate.textContent = `Due: ${todo.dueDate}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        project_Manager.list_all_todos = project_Manager.list_all_todos.filter(t => t !== todo);
    });

    li.appendChild(todo_Title);
    li.appendChild(project_text);
    li.appendChild(todo_priority);
    li.appendChild(todo_description);
    li.appendChild(todo_dueDate);
    li.appendChild(deleteBtn);

    todo_list.appendChild(li);
}

document.addEventListener("DOMContentLoaded", () => {
    getFormData(); // Get the form data and setup event listeners
    renderAllTodos(); // Render all todos on page load
});

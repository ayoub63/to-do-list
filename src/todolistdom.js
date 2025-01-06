import { Todo } from "./todo";
import projectManager from "./projectmanagersingelton";
import { formatDate } from "./datefunctions";

function toggleDialog() {
    const dialog = document.getElementById("todo-dialog");

    if (dialog.open) {
        dialog.close();  // Close the dialog if it's open
    } else {
        dialog.showModal();  // Show the dialog if it's closed
    }
}
// get form data and pass to create ToDo
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
        const todoTitle = formData.get("todoName");
        const project = formData.get("project-select");
        const priority = formData.get("priority-select");
        const description = formData.get("description");
        const dueDate = formData.get("due-date");

        createToDo(todoTitle, description, project, dueDate, priority);
        toggleDialog();
        form.reset();
    });
}

// create todo object, add to list
function createToDo(todoTitle, description, projectName, dueDate, priority) {
    const todo = new Todo(todoTitle, description, projectName, dueDate, priority);

    projectManager.addTodo_toProject(todo);

    renderAllTodos(); // Refresh the todo list
}




// function to render all todos , call rendertodo for each instance
function renderAllTodos() {
    const todoListContainer = document.querySelector(".todo-list");

    todoListContainer.innerHTML = '';

    const all_btn = document.getElementById("all")

    projectManager.list_all_todos.forEach(todo => {
        renderToDo(todo);
    });

    all_btn.addEventListener("click", () => {
        todoListContainer.innerHTML = ''; 
        projectManager.list_all_todos.forEach(todo => {
            renderToDo(todo);
        });
    })
    
}



// Function to render individual todo
export function renderToDo(todo) {
const todo_list = document.querySelector(".todo-list");
const li = document.createElement("li");
li.classList.add("todo-item");  // Add class for the list item

const todo_div = document.createElement("div");
todo_div.classList.add("todo-div");  // Add class for the todo container

const todo_Title = document.createElement("h3");
todo_Title.textContent = todo.name;
todo_Title.classList.add("todo-title");  // Add class for the title

const project_text = document.createElement("h4");
project_text.textContent = `Project: ${todo.project}`;
project_text.classList.add("todo-project");  // Add class for the project name

const todo_priority = document.createElement("div");
todo_priority.textContent = `Priority: ${todo.priority}`;
todo_priority.classList.add("todo-priority");  // Add class for priority

const todo_description = document.createElement("p");
todo_description.textContent = `Description: ${todo.description}`;
todo_description.classList.add("todo-description");  // Add class for the description

const formattedDueDate = formatDate(todo.dueDate);
const todo_dueDate = document.createElement("p");
todo_dueDate.textContent = `Due: ${formattedDueDate}`;
todo_dueDate.classList.add("todo-due-date");  // Add class for due date

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.classList.add("todo-delete-btn"); 
deleteBtn.classList.add("todo-btn")
deleteBtn.textContent = "Delete";

const pending = document.createElement("span")
updatebtn.textContent = "Update";

const updatebtn = document.createElement ("button")
updatebtn.textContent = "Update";
updatebtn.classList.add("update-btn")
updatebtn.classList.add("todo-btn")

const completebtn = document.createElement ("button")
completebtn.textContent = "Update";
completebtn.classList.add("update-btn")
completebtn.classList.add("todo-btn")



deleteBtn.addEventListener("click", () => {
    li.remove();
    projectManager.list_all_todos = projectManager.list_all_todos.filter(t => t !== todo);
    });

    todo_div.appendChild(todo_Title);
    todo_div.appendChild(project_text);
    todo_div.appendChild(todo_priority);
    todo_div.appendChild(todo_description);
    todo_div.appendChild(todo_dueDate);
    todo_div.appendChild(deleteBtn);

    li.appendChild(todo_div)
    todo_list.appendChild(li);
}






document.addEventListener("DOMContentLoaded", () => {
    getFormData(); // Get the form data and setup event listeners
});

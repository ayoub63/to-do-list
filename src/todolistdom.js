import projectManager from "./projectmanagersingelton";
import { formatDate } from "./datefunctions";
import { createToDo } from "./todomanager";
import { Todo } from "./todo";

function toggleDialog() {
    const dialog = document.getElementById("todo-dialog");

    if (dialog.open) {
        dialog.close();  // Close the dialog if it's open
    } else {
        dialog.showModal();  // Show the dialog if it's closed
    }
}

const LOCAL_STORAGE_KEY = "todos"
export function loadTodos() {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const todos = storedTodos.map(todoData => {
        const { name, description, project, dueDate, priority, completed } = todoData;
        return new Todo(name, description, project, dueDate, priority, completed);
    });

    projectManager.list_all_todos = todos; // Update the global list
    return todos;
}



// Function to save todos to localStorage
export function saveTodos() {
    const todos = projectManager.list_all_todos.map(todo => todo.toJSON());  // Convert all todos to plain objects
    localStorage.setItem('todos', JSON.stringify(todos));  // Save them
    console.log('Saved Todos:', todos);
}

// get form data and pass to create ToDo
function getFormData() {
    const btn = document.getElementById("new-task");
    const form = document.getElementById("todoForm");

    btn.addEventListener("click", () => {
        form.setAttribute("data-mode", "create"); // Set mode to create
        form.removeAttribute("data-todo-id"); // Clear any previous todo reference
        form.reset(); // Clear form fields
        toggleDialog();
    });

    form.addEventListener("submit", e => {
        e.preventDefault();
        const mode = form.getAttribute("data-mode"); // Check form mode

        const formData = new FormData(form);
        const todoTitle = formData.get("todoName");
        const project = formData.get("project-select");
        const priority = formData.get("priority-select");
        const description = formData.get("description");
        const dueDate = formData.get("due-date");
        const completed = false

        if (mode === "create") {
            // Create a new todo
            createToDo(todoTitle, description, project, dueDate, priority, completed);
        } else if (mode === "update") {
            // Update existing todo
            const todoIndex = form.getAttribute("data-todo-id");
            const todo = projectManager.list_all_todos[todoIndex];
            if (todo) {
                todo.name = todoTitle;
                todo.project = project;
                todo.priority = priority;
                todo.description = description;
                todo.dueDate = dueDate;
                todo.completed = false;
                saveTodos()
                renderAllTodos(); // Refresh the todo list
            }
        }

        toggleDialog();
        form.reset();
    });
}

// function to render all todos , call rendertodo for each instance
export function renderAllTodos() {
    const todoListContainer = document.querySelector(".todo-list");
    todoListContainer.innerHTML = ''; // Clear the todo list container

    const all_btn = document.getElementById("all");

    // Directly render all todos
    projectManager.list_all_todos.forEach(todo => {
        renderToDo(todo); // Render each todo
    });

    // Add event listener to the "All" button to reload todos when clicked
    all_btn.addEventListener("click", () => {
        todoListContainer.innerHTML = ''; // Clear the todo list container
        projectManager.list_all_todos.forEach(todo => {
            renderToDo(todo); // Re-render all todos
        });
    });
}




// Function to render individual todo
export function renderToDo(todo) {
    const todo_list = document.querySelector(".todo-list");
    const li = document.createElement("li");
    li.classList.add("todo-item");

    const todo_div = document.createElement("div");
    todo_div.classList.add("todo-div");

    // Title, project, and pending section combined
    const title_project_pending_div = document.createElement("div");
    title_project_pending_div.classList.add("title-project-pending-div");

    const title_project_div = document.createElement("div");
    title_project_div.classList.add("title-project-div");

    const todo_Title = document.createElement("h3");
    todo_Title.textContent = todo.name;
    todo_Title.classList.add("todo-title");

    const project_text = document.createElement("h4");
    project_text.textContent = `Project: ${todo.project}`;
    project_text.classList.add("todo-project");

    title_project_div.appendChild(todo_Title);
    title_project_div.appendChild(project_text);

    // Pending section
    const pending_div = document.createElement("div");
    pending_div.classList.add("pending-div");

    const pending = document.createElement("span");
    pending.textContent = "Pending";

    pending_div.appendChild(pending);

    title_project_pending_div.appendChild(title_project_div);
    title_project_pending_div.appendChild(pending_div);

    // Due date and priority section
    const dueDate_priority_div = document.createElement("div");
    dueDate_priority_div.classList.add("due-date-priority-div");

    const todo_priority = document.createElement("div");
    todo_priority.textContent = `Priority: ${todo.priority}`;
    todo_priority.classList.add("todo-priority");

    const formattedDueDate = formatDate(todo.dueDate);
    const todo_dueDate = document.createElement("p");
    todo_dueDate.textContent = `Due: ${formattedDueDate}`;
    todo_dueDate.classList.add("todo-due-date");

    dueDate_priority_div.appendChild(todo_dueDate);
    dueDate_priority_div.appendChild(todo_priority);

    // Buttons section
    const buttons_div = document.createElement("div");
    buttons_div.classList.add("buttons-div");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("todo-delete-btn");
    deleteBtn.classList.add("todo-btn");

    const updatebtn = document.createElement("button");
    updatebtn.textContent = "Update";
    updatebtn.classList.add("update-btn");
    updatebtn.classList.add("todo-btn");

    const completebtn = document.createElement("button");
    completebtn.textContent = "Mark as Completed";
    completebtn.classList.add("update-btn");
    completebtn.classList.add("todo-btn");

    updatebtn.addEventListener("click", () => {
        const form = document.getElementById("todoForm");
        const dialog = document.getElementById("todo-dialog");

        // Set form mode to update
        form.setAttribute("data-mode", "update");
        form.setAttribute("data-todo-id", projectManager.list_all_todos.indexOf(todo)); // Store the todo index

        // Pre-fill form fields with the selected todo's details
        form.elements["todoName"].value = todo.name;
        form.elements["project-select"].value = todo.project;
        form.elements["priority-select"].value = todo.priority;
        form.elements["description"].value = todo.description;
        form.elements["due-date"].value = formatDate(todo.dueDate)
        dialog.showModal(); // Open the dialog
        
    });

    completebtn.addEventListener("click", () => {
        todo.toggleCompleted();
        pending.textContent = todo.completed ? "Completed" : "Pending";
        completebtn.textContent = todo.completed ? "Unmark as Complete" : "Mark as Complete";
        saveTodos()
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();
        projectManager.list_all_todos = projectManager.list_all_todos.filter(t => t !== todo);
        saveTodos();
        loadTodos();

    });

    buttons_div.appendChild(deleteBtn);
    buttons_div.appendChild(updatebtn);
    buttons_div.appendChild(completebtn);

    todo_div.appendChild(title_project_pending_div);
    todo_div.appendChild(dueDate_priority_div);
    todo_div.appendChild(buttons_div);

    li.appendChild(todo_div);
    todo_list.appendChild(li);

    
}







document.addEventListener("DOMContentLoaded", () => {
    getFormData(); // Get the form data and setup event listeners
    loadTodos();
    renderAllTodos(); 
});

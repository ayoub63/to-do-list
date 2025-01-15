import projectManager from "./projectmanagersingelton";
import { renderAllTodos } from "./todolistdom";


export function formatDate(dateString) {
    const date = new Date(dateString);  // Create a Date object from the string
    const day = String(date.getDate()).padStart(2, '0');  // Ensure two digits for day
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Get month and ensure two digits
    const year = date.getFullYear();  // Get the full year

    return `${day}.${month}.${year}`;  // Return the formatted date
}

export function toggleToday() {
    const btn = document.getElementById("today");
    const today = new Date();
    const todoListContainer = document.querySelector(".todo-list");

    btn.addEventListener("click", () => {
        
        todoListContainer.innerHTML = ''
        let todays_todos = projectManager.list_all_todos.filter((t) => {
            const todoDate = new Date(t.dueDate);

            return (
                todoDate.getFullYear() === today.getFullYear() &&
                todoDate.getMonth() === today.getMonth() &&
                todoDate.getDate() === today.getDate()
            );
        });

        renderAllTodos(todays_todos)
    });
}


export function toggleMissed() {
    const btn = document.getElementById("missed");
    const today = new Date();
    const todoListContainer = document.querySelector(".todo-list");

    btn.addEventListener("click", () => {
        
        todoListContainer.innerHTML = ''
        let missed_todos = projectManager.list_all_todos.filter((t) => {
            const todoDate = new Date(t.dueDate);

            return (
                todoDate < today
            );
        });

        renderAllTodos(missed_todos)
    });
}



export function inProgress() {
    const btn = document.getElementById("progress");
    const today = new Date();
    const todoListContainer = document.querySelector(".todo-list");

    btn.addEventListener("click", () => {
        
        todoListContainer.innerHTML = ''
        let inprogess_todos = projectManager.list_all_todos.filter((t) => {
            const todoDate = new Date(t.dueDate);

            return (
                todoDate > today
            );
        });

        renderAllTodos(inprogess_todos)
    });
}
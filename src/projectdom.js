import { Project } from "./project";
import projectManager from "./projectmanagersingelton";
import { renderToDo } from "./todolistdom";


function toggleDialog() {

    const dialog = document.getElementById("project-dialog");

    if (dialog.open) {
        dialog.close();  // Close the dialog if it's open
    } else {
        dialog.showModal();  // Show the dialog if it's closed
    }
}

function saveProjects() {
    const projects = projectManager.list_of_projects.map(project => ({
        name: project.name, // Extract only serializable properties
    }));
    localStorage.setItem("projects", JSON.stringify(projects));
}
function loadProjects() {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const projects = storedProjects.map(projectData => new Project(projectData.name));
    projectManager.list_of_projects = projects; // Update the global list
    return projects;
}
function createProject(projectname) {
    if (!projectname) {
        console.error("Project name is required");
        return;
    }

    const project = new Project(projectname);
    projectManager.addProject(project); // Add project to the global manager
    saveProjects(); // Save the updated project list to localStorage

    renderProjects(); // Re-render the projects
}

function getFormData () {
    const btn = document.getElementById("new-project")
    const form = document.getElementById("projectForm")

    btn.addEventListener("click", () => {
        toggleDialog()
    })

    form.addEventListener("submit", e => {
        e.preventDefault()
        const projectname= form.elements["projectname"].value
       
        createProject(projectname)
        toggleDialog()
        form.reset()
    })

    
}




function renderProjects() {
    const projectdiv = document.querySelector(".project-list");
    const select = document.getElementById("project-select");

    projectdiv.innerHTML = ""; // Clear the current project list
    select.innerHTML = ""; // Clear the dropdown list

    projectManager.list_of_projects.forEach(project => {
        // Render project button
        const li = document.createElement("div");
        li.classList.add("project-div");

        const btn = document.createElement("button");
        btn.classList.add("project-button");
        btn.textContent = project.name;

        const deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";
        deletebtn.classList.add("deletebtn");

        btn.addEventListener("click", () => {
            renderTodosForProject(project);
        });

        li.appendChild(btn);
        li.appendChild(deletebtn);
        projectdiv.appendChild(li);

        // Render project in dropdown
        const projectselect = document.createElement("option");
        projectselect.value = project.name;
        projectselect.textContent = project.name;
        select.appendChild(projectselect);

        // Delete button functionality
        deletebtn.addEventListener("click", () => {
            if (confirm(`Are you sure you want to delete the project "${project.name}" and its todos?`)) {
                projectManager.deleteProject(project);
                saveProjects();
                renderProjects(); // Update the project list
            }
        });
    });
}



function renderTodosForProject(project) {
    const todoListDiv = document.querySelector(".todo-list");
    todoListDiv.innerHTML = "";  // Clear existing todos

    // Filter the global todos to show only those associated with the current project
    const projectTodos = projectManager.list_all_todos.filter(todo => todo.project === project.name);

    projectTodos.forEach(todo => {
        renderToDo(todo);  // Render each todo for this project
    });
}



document.addEventListener("DOMContentLoaded", () => {
    getFormData();
    loadProjects();
    renderProjects();
});

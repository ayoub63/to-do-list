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

function createProject(projectname) {
    if (!projectname) {
        console.error("Project name is required");
        return;
    }

    const select = document.getElementById("project-select")
    const project = new Project(projectname);
    const projectselect = document.createElement("option")
    projectselect.value = project.name
    projectselect.textContent = project.name
    select.appendChild(projectselect)
    

    
    projectManager.addProject(project);
    renderProjects()
    


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
    const projectlist = projectManager.getProjects(); // Get all projects

    projectdiv.innerHTML = ""; // Clear the current project list

    projectlist.forEach(project => {
        const li = document.createElement("div");
        li.classList.add("project-div")
        const btn = document.createElement("button");
        btn.classList.add ("project-button")
        const deletebtn = document.createElement("button");

        deletebtn.textContent = "Delete";
        deletebtn.classList.add("deletebtn")
        
        btn.textContent = project.name;

        btn.addEventListener("click", () => {
            renderTodosForProject(project);
        });

        li.appendChild(btn);
        li.appendChild(deletebtn);
        projectdiv.appendChild(li);

        // Delete button functionality
        deletebtn.addEventListener("click", () => {
            if (confirm(`Are you sure you want to delete the project "${project.name}" and its todos?`)) {
                // Remove the project from the global list of projects
                projectManager.deleteProject(project);
        
                // Remove the todos associated with the project from the global todo list
                projectManager.deleteTodosByProject(project);
        
                // Remove the project from the dropdown
                const options = select.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].value === project.name) {
                        select.remove(i);
                        break;
                    }
                }
        
                renderProjects();  // Update project list
            }
        });
    });

    if (!projectdiv) {
        console.error("Project list container not found");
        return;
    }
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
    renderProjects();
});

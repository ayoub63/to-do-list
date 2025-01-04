import { Project } from "./project";
import {ProjectManager} from "./projectmanager.js"
const project_Manager = new ProjectManager();


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

    const project = new Project(projectname);
    console.log(project.name)

    
    project_Manager.addProject(project);
    renderProjects()
    console.log(proaject_Manager.getProjects());


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
    })

    
}




function renderProjects () {
    const projectdiv = document.querySelector(".project-list")
    const projectlist = project_Manager.getProjects()
    projectdiv.innerHTML = ""; 
    projectlist.forEach((project) => {
        console.log("Project being rendered:", project.name);
        const li = document.createElement("div")
        const btn = document.createElement("button")
        btn.textContent = project.name
        li.appendChild(btn)
        projectdiv.appendChild(li)
    })

    if (!projectdiv) {
        console.error("Project list container not found");
        return;

    }
}

document.addEventListener("DOMContentLoaded", () => {
    getFormData();
});
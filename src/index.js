import "./style.css"
import "./projectdom.js"
import  { Todo } from "./todo.js"
import "./todolistdom.js"
import  { Projectmanager } from "./projectmanager.js"
import { Project } from "./project.js"
import { toggleToday, toggleMissed, inProgress} from "./datefunctions.js";

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Call the function to attach the event listener
    toggleToday();
    toggleMissed();
    inProgress();

});
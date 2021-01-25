import renderProjectList from './renderProjectList';
import createProject from './createProject';

//initial project list for testing
let projects = [{
  name: "Test Project", 
  todoList: [{
    title: "Test Todo", 
    desc: "Test desc.",
    project: "Parent Project",
    priority: 2,
    dueDate: "due date",
    createdDate: "created date"
  }]
}];

//DOM elements
const projectListContainer = document.getElementById('projectListContainer');
const addProjectButton = document.getElementById('addProjectButton');
const newProjectModal = document.getElementById('newProjectModal');
const closeProjectModal = document.getElementById('closeProjectModal');
const newProjectForm = document.getElementById('newProjectForm');

//local storage and page load setup
function updateStorage() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem('projects')) {
    projects = JSON.parse(localStorage.getItem('projects'));
  } else {
    updateStorage();
  }

  projectListContainer.appendChild(renderProjectList(projects));
})

//Code for the "Add Project" modal
addProjectButton.addEventListener("click", () => {
  newProjectModal.style.display = "block";
});

const resetModal = () => {
  newProjectModal.style.display = "none";
  newProjectForm.reset();
}

closeProjectModal.addEventListener("click", () => {
  resetModal();
});

window.addEventListener("click", (event) => {
  if (event.target == newProjectModal) {
    resetModal();
  }
})

newProjectForm.addEventListener('submit', () => {
  const projectFormElements = newProjectForm.elements;
  projects.push(createProject(projectFormElements));
  updateStorage();
  resetModal();
})
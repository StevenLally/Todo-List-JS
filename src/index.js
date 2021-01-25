import renderProjectList from './renderProjectList';
import renderTodos from './renderTodos';
import createProject from './createProject';
import createTodo from './createTodo';

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
let projectListItems = document.getElementById('projectListItems');
const addProjectButton = document.getElementById('addProjectButton');
const newProjectModal = document.getElementById('newProjectModal');
const closeProjectModal = document.getElementById('closeProjectModal');
const newProjectForm = document.getElementById('newProjectForm');
const todoView = document.getElementById('todoView');

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
  projectListItems = document.getElementById('projectListItems');
  createProjectNodes(projectListItems);
})

//event listeners for each listed project to render Todos
const createProjectNodes = (projectListItems) => {
  const nodeArray = [...projectListItems.childNodes].filter(ele => {
    return ele.localName == "a";
  });

  nodeArray.forEach(node => {
    node.addEventListener('click', () => {
      const project = projects.filter(project => {
        return project.name === node.outerText;
      });

      todoView.innerHTML = '';
      todoView.appendChild(renderTodos(project.todoList));
    })
  })
}

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

newProjectForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const projectFormElements = newProjectForm.elements;
  projects.push(createProject(projectFormElements));
  updateStorage();
  resetModal();

  projectListContainer.innerHTML = '';
  projectListContainer.appendChild(renderProjectList(projects));
  projectListItems = document.getElementById('projectListItems');
  createProjectNodes(projectListItems);
})
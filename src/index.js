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
let projectListItems = document.getElementById('projectListItems');  //done as a let so it can update when projects are added/removed
const addProjectButton = document.getElementById('addProjectButton');
const newProjectModal = document.getElementById('newProjectModal');
const closeProjectModal = document.getElementById('closeProjectModal');
const newProjectForm = document.getElementById('newProjectForm');
const todoView = document.getElementById('todoView');
let addTodoButton;
const newTodoModal = document.getElementById('newTodoModal');
const closeTodoModal = document.getElementById('closeTodoModal');
const newTodoForm = document.getElementById('newTodoForm');

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
      })[0];

      todoView.innerHTML = '';
      todoView.appendChild(renderTodos(project));
      addTodoButton = document.getElementById('addTodoButton'); //update button to be for current project
      addTodoButton.addEventListener("click", () => {
        newTodoModal.style.display = "block";
      });
    })
  })
}

//Code for the "Add Project" modal
addProjectButton.addEventListener("click", () => {
  newProjectModal.style.display = "block";
});

const resetProjectModal = () => {
  newProjectModal.style.display = "none";
  newProjectForm.reset();
}

closeProjectModal.addEventListener("click", () => {
  resetProjectModal();
});

window.addEventListener("click", (event) => {
  if (event.target == newProjectModal) {
    resetProjectModal();
  }
})

newProjectForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const projectFormElements = newProjectForm.elements;
  projects.push(createProject(projectFormElements));
  updateStorage();
  resetProjectModal();

  projectListContainer.innerHTML = '';
  projectListContainer.appendChild(renderProjectList(projects));
  projectListItems = document.getElementById('projectListItems');
  createProjectNodes(projectListItems);
})

//Code for "Add Todo" modal
const resetTodoModal = () => {
  newTodoModal.style.display = "none";
  newTodoForm.reset();
}

closeTodoModal.addEventListener("click", () => {
  resetTodoModal();
});

window.addEventListener("click", (event) => {
  if (event.target == newTodoModal) {
    resetTodoModal();
  }
})

newTodoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const todoFormElements = newTodoForm.elements;
  const currentProjectName = addTodoButton.dataset.project;
  let currentProject;

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].name === currentProject) {
      currentProject = projects[i];
      projects[i].todoList.push(createTodo(todoFormElements, currentProjectName))
      updateStorage();
      break;
    }
  }
  
  resetTodoModal();

  todoView.innerHTML = '';
  todoView.appendChild(renderTodos(currentProject));
  addTodoButton = document.getElementById('addTodoButton'); //update button to be for current project
  addTodoButton.addEventListener("click", () => {
    newTodoModal.style.display = "block";
  });
})
import renderProjectList from './renderProjectList.js';
import renderTodos from './renderTodos.js';
import createProject from './createProject.js';
import createTodo from './createTodo.js';
import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';

//initial project list for testing
let projects = [{
  name: "Test Project", 
  todoList: [{
    id: uuidv4(),
    title: "Test Todo", 
    desc: "Test desc.",
    project: "Test Project",
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
const viewAllTodos = document.getElementById('viewAllTodos');
let currentlyViewingAll = false;
let deleteProjectButton;

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

//function to assign event listener to add todo buttons
const addTodoButtonUpdate = () => {
  const todoNodes = document.getElementById('todoItems');
  const addTodoButtonNodes = [...todoNodes.childNodes].filter(ele => {
    return ele.className == "addTodoButton";
  });

  addTodoButtonNodes.forEach(node => {
    node.addEventListener('click', () => {
      addTodoButton = node;
      newTodoModal.style.display = "block";
    })
  })
}

//event listeners for each listed project to render Todos
const createProjectNodes = (projectListItems) => {
  const nodeArray = [...projectListItems.childNodes].filter(ele => {
    return ele.localName == "a";
  });

  nodeArray.forEach(node => {
    node.addEventListener('click', () => {
      currentlyViewingAll = false;
      const project = projects.filter(project => {
        return project.name === node.outerText;
      });

      todoView.innerHTML = '';
      todoView.appendChild(renderTodos(project));
      addTodoButtonUpdate();
      updateDeleteButtons();
      deleteProjectButtonUpdate();
    })
  })
}

//display all todos at once
viewAllTodos.addEventListener('click', () => {
  currentlyViewingAll = true;
  todoView.innerHTML = '';
  todoView.appendChild(renderTodos(projects));

  addTodoButtonUpdate();
  updateDeleteButtons();
  deleteProjectButtonUpdate();
})

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

  function postLoopRender() {
    todoView.innerHTML = '';

    if (currentlyViewingAll){
      todoView.appendChild(renderTodos(projects));
    } else {
      todoView.appendChild(renderTodos([currentProject])); 
    }

    addTodoButtonUpdate();
    updateDeleteButtons();
    deleteProjectButtonUpdate();
  }

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].name === currentProjectName) {
      currentProject = projects[i];
      projects[i].todoList.push(createTodo(todoFormElements, currentProjectName));
      updateStorage();
      postLoopRender();
      break;
    }
  }
  
  resetTodoModal(); 
})

//delete button functionality
const updateDeleteButtons = () => {
  const deleteButtonNodes = [...document.querySelectorAll('.deleteTodoButton')];
  let currentProject;
  let updatedProjectTodos;

  deleteButtonNodes.forEach(node => {
    node.addEventListener('click', () => {
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].name === node.dataset.project) {
          currentProject = projects[i];
          updatedProjectTodos = projects[i].todoList.filter(todo => {
            return todo.id != node.dataset.id;
          });
          projects[i].todoList = updatedProjectTodos;
          updateStorage();
          
          todoView.innerHTML = '';

          if (currentlyViewingAll){
            todoView.appendChild(renderTodos(projects));
          } else {
            todoView.appendChild(renderTodos([currentProject])); 
          }

          addTodoButtonUpdate();
          updateDeleteButtons();
          deleteProjectButtonUpdate();

          break;
        }
      }
      
    })
  })
}

//delete project button functionality
const deleteProjectButtonUpdate = () => {
  let currentProject;
  let updatedProjects;
  const todoNodes = document.getElementById('todoItems');
  const deleteProjectButtonNodes = [...todoNodes.childNodes].filter(ele => {
    return ele.className == "deleteProjectButton";
  });

  deleteProjectButtonNodes.forEach(node => {
    node.addEventListener('click', () => {
      deleteProjectButton = node;
      
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].name === node.dataset.project) {
          currentProject = projects[i];
          updatedProjects = projects.filter(project => {
            return project != currentProject;
          });

          projects = updatedProjects;
          updateStorage();
          
          todoView.innerHTML = '';

          if (currentlyViewingAll){
            todoView.appendChild(renderTodos(projects));
            addTodoButtonUpdate();
            updateDeleteButtons();
            deleteProjectButtonUpdate();
          } else {
            todoView.innerHTML = 'Select a Project to View'; 
          }
          
          projectListContainer.innerHTML = '';
          projectListContainer.appendChild(renderProjectList(projects));
          projectListItems = document.getElementById('projectListItems');
          createProjectNodes(projectListItems);

          break;
        }
      }
    })
  })
}
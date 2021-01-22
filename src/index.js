import renderProjectList from './renderProjectList';

//initial project list and local storage setup
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

const projectListContainer = document.getElementById('projectListContainer');

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
class Project {
  constructor(name) {
    this.name = name;
    this.todoList = [];
  }
}

const createProject = (projectFormElements) => {
  const projectName = projectFormElements[0].value;
  const newProject = new Project(projectName);

  return newProject;
}

export default createProject;
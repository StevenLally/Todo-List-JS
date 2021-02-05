class Todo {
  constructor(title, desc, project, priority, dueDate, createdDate) {
    this.title = title;
    this.desc = desc;
    this.project = project;
    this.priority = priority;
    this.dueDate = dueDate;
    this.createdDate = createdDate;
  }
}

const createTodo = (todoFormElements, projectName) => {
  const title = todoFormElements[0].value;
  const desc = todoFormElements[1].value;
  const project = projectName;
  const priority = todoFormElements[2].value;
  const dueDate = todoFormElements[3].value;

  let createdDate = new Date();
  const day = String(createdDate.getDate()).padStart(2, '0');
  const month = String(createdDate.getMonth() + 1).padStart(2, '0');
  const year = createdDate.getFullYear();
  createdDate = year + '-' + month + '-' + day;

  const newTodo = new Todo(title, desc, project, priority, dueDate, createdDate);

  return newTodo;
}

export default createTodo;
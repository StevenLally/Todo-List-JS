const renderTodos = (projects) => {

  const div = document.createElement('div');
  div.id = 'todoItems';

  projects.forEach(project => {
    const todoList = project.todoList;
    const projectName = project.name;

    const projectHeader = document.createElement('h3');
    projectHeader.className = 'projectHeader';
    projectHeader.innerHTML = projectName;

    div.appendChild(projectHeader);

    const addTodoButton = document.createElement('button');
    addTodoButton.className = 'addTodoButton';
    addTodoButton.dataset.project = projectName;
    addTodoButton.innerHTML = `Add Todo to ${projectName}`;

    div.appendChild(addTodoButton);

    const deleteProjectButton = document.createElement('button');
    deleteProjectButton.className = 'deleteProjectButton';
    deleteProjectButton.dataset.project = projectName;
    deleteProjectButton.innerHTML = `Delete ${projectName}`;

    div.appendChild(deleteProjectButton);

    todoList.forEach(todo => {
      const todoTile = document.createElement('div');
      todoTile.classList.add('todoTile');

      const todoTitle = document.createElement('p');
      todoTitle.innerHTML = todo.title;
      todoTitle.classList.add('todoTitle');
      todoTile.appendChild(todoTitle);

      const todoDesc = document.createElement('p');
      todoDesc.innerHTML = todo.desc;
      todoDesc.classList.add('todoDesc');
      todoTile.appendChild(todoDesc);

      const todoProject = document.createElement('p');
      todoProject.innerHTML = todo.project;
      todoProject.classList.add('todoProject');
      todoTile.appendChild(todoProject);

      const todoPriority = document.createElement('p');
      todoPriority.innerHTML = todo.priority;
      todoPriority.classList.add('todoPriority');
      todoTile.appendChild(todoPriority);

      const todoDueDate = document.createElement('p');
      todoDueDate.innerHTML = todo.dueDate;
      todoDueDate.classList.add('todoDueDate');
      todoTile.appendChild(todoDueDate);

      const todoCreatedDate = document.createElement('p');
      todoCreatedDate.innerHTML = todo.createdDate;
      todoCreatedDate.classList.add('todoCreatedDate');
      todoTile.appendChild(todoCreatedDate);

      const deleteTodo = document.createElement('button');
      deleteTodo.className = 'deleteTodoButton';
      deleteTodo.dataset.project = projectName;
      deleteTodo.dataset.id = todo.id;
      deleteTodo.innerHTML = 'Delete Todo';
      todoTile.appendChild(deleteTodo);

      div.appendChild(todoTile);
    });
  });

  return div;
}

export default renderTodos;
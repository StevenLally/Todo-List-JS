const renderTodos = (todoList) => {
  const div = document.createElement('div');
  div.id = 'todoItems';

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

    div.appendChild(todoTile);
  });

  return div;
}

export default renderTodos;
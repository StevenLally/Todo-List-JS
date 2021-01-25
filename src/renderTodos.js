const renderTodos = (todoList) => {
  const div = document.createElement('div');
  div.id = 'todoItems';

  todoList.forEach(todo => {
    const todoTile = document.createElement('div');
    todoTile.classList.add('todoTile');

    const todoTitle = document.createElement('p');
    todoTitle.innerHTML = todo.title;
    todoTile.appendChild(todoTitle);

    const todoDesc = document.createElement('p');
    todoDesc.innerHTML = todo.desc;
    todoTile.appendChild(todoDesc);

    const todoProject = document.createElement('p');
    todoProject.innerHTML = todo.project;
    todoTile.appendChild(todoProject);

    const todoPriority = document.createElement('p');
    todoPriority.innerHTML = todo.priority;
    todoTile.appendChild(todoPriority);

    const todoDueDate = document.createElement('p');
    todoDueDate.innerHTML = todo.dueDate;
    todoTile.appendChild(todoDueDate);

    const todoCreatedDate = document.createElement('p');
    todoCreatedDate.innerHTML = todo.createdDate;
    todoTile.appendChild(todoCreatedDate);

    div.appendChild(todoTile);
  });

  return div;
}

export default renderTodos;
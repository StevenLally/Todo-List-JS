const renderProjectList = (projects) => {

  const div = document.createElement('div');
  div.id = 'projectListItems';

  projects.forEach((project) => {
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.innerHTML = project.name;
    div.appendChild(a);
  });

  return div;
}

export default renderProjectList;
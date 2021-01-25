const renderProjectList = (projects) => {

  const div = document.createElement('div');
  div.id = 'projectListItems';

  projects.forEach((project) => {
    const a = document.createElement('a');
    const br = document.createElement('br');
    a.setAttribute('href', '#');
    a.innerHTML = project.name;
    div.appendChild(a);
    div.appendChild(br);
  });

  return div;
}

export default renderProjectList;
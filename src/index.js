import {Todo, buildTodo} from "./todo"
import {currentProject, setCurrentProject, buildProjects, getAllProjects, Project, storeProject, removeTodo, removeProject} from "./project"

const createDefaultProject = () => {
  let defaultProject = new Project('Default')
  let defaultTodos = []

  let todo1 = new Todo('Create a Project', 'Click the New Project button and fill in a title and click Create Project to add a new project to your todo list', 'now', 'low')
  defaultTodos.push(todo1)

  let todo2 = new Todo('Create a Todo', 'Click the New Task button and fill out the information and click Create Task to add a new Todo to your current project.', 'now', 'medium')
  defaultTodos.push(todo2)

  defaultTodos.forEach( todo => defaultProject.todos.push(todo))
  storeProject(defaultProject)
  setCurrentProject(defaultProject)
}


if (getAllProjects() == null || getAllProjects().length == 0) {
  console.log('No projects, building default')
  createDefaultProject()
  buildProjects()
}
else {
  buildProjects()
}

//Open project form modal
document.getElementById('new-project').addEventListener('click', () => {
  document.getElementById('form-container').classList.remove('hidden')
  document.getElementById('project-form-container').classList.remove('hidden')
  document.getElementById('todo-form-container').classList.add('hidden')
})

//Open todo form modal
document.getElementById('new-task').addEventListener('click', () => {
  document.getElementById('form-container').classList.remove('hidden')
  document.getElementById('project-form-container').classList.add('hidden')
  document.getElementById('todo-form-container').classList.remove('hidden')
})


// Close form modal while open
window.addEventListener('click', (event) => {
  if (event.target.id == 'form-container') {
    document.getElementById('form-container').classList.add('hidden')
  }
})

//Clear projects
document.getElementById('clear-projects').addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all your projects?')) {
    localStorage.clear()
    console.log('cleared projects')
    location.reload()
  }
})

//Build Todos for Current Project
if (getAllProjects().length > 0) {
  let projectsElem = document.getElementById('projects')
  let correctnode = projectsElem.children[1]

  for (let i = 0; i < projectsElem.children.length; i++) {
    const node = projectsElem.children[i];
    if (node.firstChild.innerHTML == currentProject().title) {
      correctnode = node
    }
  }
  correctnode.firstChild.click()
}
//test

//console.log(document.getElementById('projects').childNodes[1].innerHTML == 'Default')
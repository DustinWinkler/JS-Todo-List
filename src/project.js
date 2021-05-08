import {buildTodo} from './todo'

export class Project {
  constructor(title) {
    this.title = title
    this.todos = []
  }
}

function setCurrentProject(project) {
  localStorage.setItem('currentProject', JSON.stringify(project))
}

function currentProject() {
  return JSON.parse(localStorage.getItem('currentProject'))
}

const storeProject = (newProject) => {
  let allProjects = []

  //If there are no projects
  if (getAllProjects() === null) {
    //Add this project to the list and store it
    allProjects.push(newProject)
    localStorage.setItem('allProjects', JSON.stringify(allProjects))
  }
  else {
    JSON.parse(localStorage.getItem('allProjects')).forEach(project => {
      allProjects.push(project)
    })
    // If project already exists
    if (allProjects.some(project => project.title == newProject.title)) {
      let existingProject
      let index = allProjects.indexOf(allProjects.find(project => project.title == newProject.title))

      allProjects.splice(index, 1, newProject)
    }
    else {
      allProjects.push(newProject)
    }
    localStorage.setItem('allProjects', JSON.stringify(allProjects))
  }
}


const getAllProjects = () => {
  if (localStorage.length == 0 || localStorage.getItem('allProjects').length > 0) {
    return JSON.parse(localStorage.getItem('allProjects'))
  }
  else {
    return null
  }
}

const buildProjects = () => {
  console.log('building projects')

  let projectsDiv = document.getElementById('projects')
  
  getAllProjects().forEach(project => {
    let newProjectElement = document.createElement('li')

    let newProjectP = document.createElement('p')
    newProjectP.innerHTML = project.title
    newProjectElement.appendChild(newProjectP)

    let deleteButton = document.createElement('div')
    deleteButton.innerHTML = 'x'
    deleteButton.classList.add('project-delete')

    deleteButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this project?')) {
        removeProject(project)
      }
    })

    newProjectElement.appendChild(deleteButton)

    newProjectElement.addEventListener('click', () => {
      let taskDiv = document.getElementById('tasks-container')
      taskDiv.innerHTML = ''
      setCurrentProject(project)
      console.log('current project below')
      console.log(currentProject())
      project.todos.forEach(todo => {
        taskDiv.appendChild(buildTodo(todo))
      })

      let taskButton = document.getElementById('new-task')
      taskButton.innerHTML = `New Task for ${project.title}`
    })

    projectsDiv.appendChild(newProjectElement)
  })
}

const newProjectForm = document.getElementById('project-form')
newProjectForm.addEventListener('submit', (event) => {
  console.log('running new project submit function')

  let newproj = new Project(event.target[0].value)
  storeProject(newproj)
})

function removeTodo(project, todo) {
  let todoIndex = project.todos.indexOf(project.todos.find(existingTodo => existingTodo.title == todo.title))

  project.todos.splice(todoIndex, 1)

  storeProject(project)
  location.reload()
}

function removeProject(project) {
  let allProjects = []
  JSON.parse(localStorage.getItem('allProjects')).forEach(project => {
    allProjects.push(project)
  })
  let foundProject = allProjects.find(proj => proj.title == project.title)
  let index = allProjects.indexOf(foundProject)

  allProjects.splice(index, 1)
  localStorage.setItem('allProjects', JSON.stringify(allProjects))
  location.reload()
}


export {currentProject, setCurrentProject, removeProject, removeTodo, buildProjects, storeProject, getAllProjects }
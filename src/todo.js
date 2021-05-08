import { currentProject, removeTodo, storeProject } from "./project"

export class Todo {
  constructor(title, description, duedate, priority) {
    this.title = title
    this.description = description
    this.duedate = duedate
    this.priority = priority
  }
}

function addTodo(project, todo) {
  project.todos.push(todo)
  storeProject(project)
}

const buildTodo = (todo) => {
  console.log('building todos')
  let todoDiv = document.createElement('div')
  todoDiv.classList.add('task')

  let todoTitle = document.createElement('p')
  todoTitle.innerHTML = todo.title
  todoTitle.classList.add('todo-title')
  todoDiv.appendChild(todoTitle)

  let todoDescription = document.createElement('p')
  todoDescription.innerHTML = todo.description
  todoDescription.classList.add('todo-desc')
  todoDiv.appendChild(todoDescription)

  let todoDueDate = document.createElement('p')
  todoDueDate.innerHTML = todo.duedate
  todoDueDate.classList.add('todo-due')
  todoDiv.appendChild(todoDueDate)

  console.log(todo.priority)
  switch (todo.priority) {
    case 'low':
      todoDiv.classList.add('low-priority')
      break;
  
    case 'medium':
      todoDiv.classList.add('medium-priority')
      break;

    case 'high':
      todoDiv.classList.add('high-priority')
      break
  }

  let todoDelete = document.createElement('div')
  todoDelete.innerHTML = 'x'
  todoDelete.classList.add('todo-delete')
  todoDelete.addEventListener('click', (todo) => {
    if (confirm('Are you sure you want to delete this task?')) {
      removeTodo(currentProject(), todo)
      let projects = document.getElementById('projects')
      for (let i = 1; i < projects.childNodes.length; i++){
        const projectDiv = projects.childNodes[i];
        if (projectDiv.firstElementChild.innerHTML == currentProject().title) {
          projectDiv.firstElementChild.click()
        }
      }
    }
    
  })
  todoDiv.appendChild(todoDelete)

  let todoComplete = document.createElement('div')
  todoComplete.innerHTML = '✓'
  todoComplete.classList.add('todo-complete')
  todoComplete.addEventListener('click', () => {
    todoDiv.classList.toggle('completed')
  })
  todoDiv.appendChild(todoComplete)


  return todoDiv
}

const newTodoForm = document.getElementById('todo-form')
newTodoForm.addEventListener('submit', (event) => {
  console.log('running new todo submit function')
  console.log(event.target.duedate)

  let newTodo = new Todo(
    event.target.title.value,
    event.target.description.value,
    event.target.duedate.value,
    event.target.priority.value,
  )
  console.log(newTodo)
  addTodo(currentProject(), newTodo)
})

export {buildTodo}
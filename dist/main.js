(()=>{"use strict";class e{constructor(e){this.title=e,this.todos=[]}}function t(e){localStorage.setItem("currentProject",JSON.stringify(e))}function o(){return JSON.parse(localStorage.getItem("currentProject"))}const l=e=>{let t=[];if(null===n())t.push(e),localStorage.setItem("allProjects",JSON.stringify(t));else{if(JSON.parse(localStorage.getItem("allProjects")).forEach((e=>{t.push(e)})),t.some((t=>t.title==e.title))){let o=t.indexOf(t.find((t=>t.title==e.title)));t.splice(o,1,e)}else t.push(e);localStorage.setItem("allProjects",JSON.stringify(t))}},n=()=>0==localStorage.length||localStorage.getItem("allProjects").length>0?JSON.parse(localStorage.getItem("allProjects")):null,d=()=>{console.log("building projects");let e=document.getElementById("projects");n().forEach((l=>{let n=document.createElement("li"),d=document.createElement("p");d.innerHTML=l.title,n.appendChild(d);let i=document.createElement("div");i.innerHTML="x",i.classList.add("project-delete"),i.addEventListener("click",(()=>{confirm("Are you sure you want to delete this project?")&&function(e){let t=[];JSON.parse(localStorage.getItem("allProjects")).forEach((e=>{t.push(e)}));let o=t.find((t=>t.title==e.title)),l=t.indexOf(o);t.splice(l,1),localStorage.setItem("allProjects",JSON.stringify(t)),location.reload()}(l)})),n.appendChild(i),n.addEventListener("click",(()=>{let e=document.getElementById("tasks-container");e.innerHTML="",t(l),console.log("current project below"),console.log(o()),l.todos.forEach((t=>{e.appendChild(c(t))})),document.getElementById("new-task").innerHTML=`New Task for ${l.title}`})),e.appendChild(n)}))};document.getElementById("project-form").addEventListener("submit",(t=>{console.log("running new project submit function");let o=new e(t.target[0].value);l(o)}));class i{constructor(e,t,o,l){this.title=e,this.description=t,this.duedate=o,this.priority=l}}const c=e=>{console.log("building todos");let t=document.createElement("div");t.classList.add("task");let n=document.createElement("p");n.innerHTML=e.title,n.classList.add("todo-title"),t.appendChild(n);let d=document.createElement("p");d.innerHTML=e.description,d.classList.add("todo-desc"),t.appendChild(d);let i=document.createElement("p");switch(i.innerHTML=e.duedate,i.classList.add("todo-due"),t.appendChild(i),console.log(e.priority),e.priority){case"low":t.classList.add("low-priority");break;case"medium":t.classList.add("medium-priority");break;case"high":t.classList.add("high-priority")}let c=document.createElement("div");c.innerHTML="x",c.classList.add("todo-delete"),c.addEventListener("click",(e=>{if(confirm("Are you sure you want to delete this task?")){!function(e,t){let o=e.todos.indexOf(e.todos.find((e=>e.title==t.title)));e.todos.splice(o,1),l(e),location.reload()}(o(),e);let t=document.getElementById("projects");for(let e=1;e<t.childNodes.length;e++){const l=t.childNodes[e];l.firstElementChild.innerHTML==o().title&&l.firstElementChild.click()}}})),t.appendChild(c);let r=document.createElement("div");return r.innerHTML="✓",r.classList.add("todo-complete"),r.addEventListener("click",(()=>{t.classList.toggle("completed")})),t.appendChild(r),t};if(document.getElementById("todo-form").addEventListener("submit",(e=>{console.log("running new todo submit function"),console.log(e.target.duedate);let t=new i(e.target.title.value,e.target.description.value,e.target.duedate.value,e.target.priority.value);var n,d;console.log(t),d=t,(n=o()).todos.push(d),l(n)})),null==n()||0==n().length?(console.log("No projects, building default"),(()=>{let o=new e("Default"),n=[],d=new i("Create a Project","Click the New Project button and fill in a title and click Create Project to add a new project to your todo list","now","low");n.push(d);let c=new i("Create a Todo","Click the New Task button and fill out the information and click Create Task to add a new Todo to your current project.","now","medium");n.push(c),n.forEach((e=>o.todos.push(e))),l(o),t(o)})(),d()):d(),document.getElementById("new-project").addEventListener("click",(()=>{document.getElementById("form-container").classList.remove("hidden"),document.getElementById("project-form-container").classList.remove("hidden"),document.getElementById("todo-form-container").classList.add("hidden")})),document.getElementById("new-task").addEventListener("click",(()=>{document.getElementById("form-container").classList.remove("hidden"),document.getElementById("project-form-container").classList.add("hidden"),document.getElementById("todo-form-container").classList.remove("hidden")})),window.addEventListener("click",(e=>{"form-container"==e.target.id&&document.getElementById("form-container").classList.add("hidden")})),document.getElementById("clear-projects").addEventListener("click",(()=>{confirm("Are you sure you want to delete all your projects?")&&(localStorage.clear(),console.log("cleared projects"),location.reload())})),n().length>0){let e=document.getElementById("projects"),t=e.children[1];for(let l=0;l<e.children.length;l++){const n=e.children[l];n.firstChild.innerHTML==o().title&&(t=n)}t.firstChild.click()}})();
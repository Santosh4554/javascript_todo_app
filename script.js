// On app load, get all tasks from localStorage
window.onload = loadTasks;


// Retrievedata form localStorage:-
let task=localStorage.getItem('tasks');
task=JSON.parse(localStorage.getItem('tasks'));
// console.log(task)


// On form submit add task
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  addTask();
});

function loadTasks() {
  // check if localStorage has any tasks
  // if not then return
  // if (localStorage.getItem("task") == null) return;
  
  // Get the tasks from localStorage and convert it to an array
  // let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  // Loop through the tasks and add them to the list
tasks.forEach(task => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
          <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
    
  });
}

function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");
  
  // return if task is empty
  if (task.value.trim() === "") {
    alert("Please add some task!");
    return false;
  }
  // check if task already exist
  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert("Task already exist!");
    return false;
  }

  // add task to local storage
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));
  

  // create list item, add innerHTML and append to ul :-
  const li = document.createElement("li");
  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
      <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
  list.insertBefore(li, list.children[0]);

  // clear input
  task.value = "";
}

function taskComplete(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.parentNode.children[1].value) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks)); 
  event.parentElement.remove();

  
}

// store current task to track changes
var currentTask = null;

// get current task
function getCurrentTask(event) {
  currentTask = event.value;
}

// edit the task and update local storage
function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks"))); 

  // check if task is empty
  if (event.value.trim() === "") {
    alert("Task is empty!");
    event.value = currentTask;
    return;
  }


  // task already exist
  tasks.forEach(task => {
    if (task.task === event.value) {
      alert("Task already exist!");
      event.value = currentTask;
      return;
    }
  });
  // update task
  tasks.forEach(task => {
    if (task.task === currentTask) {
      task.task = event.value;
    }
  });


  // update local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}







//Remove All:-
// var clicked=false;
function removeAll(tasks){
  // if(!clicked){
  //   clicked=true;
  //   document.getElementById("checkList").innerHTML="No Data";
  // }else{
  //   clicked=false;
  //   document.getElementById("checkList").innerHTML="Remove All"
  // }

  if(task !== null){
    document.getElementById("checkList").innerHTML="No Data";
    // console.log("No Data");
    // <p>No Data</p>
  }else{
    document.getElementById("checkList").innerHTML="Remove All"
    // console.log("Remove DATA");
    // <p>Remove Data</p>
  }



  //remove
  document.querySelector('.ul').innerHTML=" ";
  localStorage.clear();
}












let taskList = document.querySelector(".task-list");
let taskName = document.querySelector("#name-input");
let taskTime = document.querySelector(".time-input");
let taskTag = document.querySelector(".tag-input");
let tasks = []; //array to store task
let addBtn = document.querySelector(".add-btn");
addBtn.addEventListener("click", addTask);
function addTask() {
  const task = taskName.value.trim();
  if (task !== "") {
    tasks.push({
      name: task,
      time: taskTime.value,
      tag: taskTag.value,
    });
    renderTask();
  }
}
function formatTime(dateObject) {
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const dayOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][
    dateObject.getDay()
  ];
  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year = dateObject.getFullYear();
  const formattedDate = `${hours}:${minutes} ${dayOfWeek} ${day}-${month}-${year}`;
  return formattedDate;
}
function renderTask() {
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `<p class="task-name">${tasks[i].name}</p>`;
    if (tasks[i].time !== "") {
      const dateObject = new Date(tasks[i].time);
      let formattedDate = formatTime(dateObject);
      task.innerHTML += `<p>📅 ${formattedDate}</p>`;
    }
    if (tasks[i].tag !== "") {
      task.innerHTML += `<p>🏷️ ${tasks[i].tag}</p>`;
    }
    task.innerHTML += ` <div class="task-operation">
                          <div class="complete-btn">Complete</div>
                          <div class="edit-btn" data-index="${i}">Edit</div>
                          <div class="delete-btn" data-index="${i}">Delete</div>
                        </div>`;
    taskList.appendChild(task);
  }
  // complete
  let completeBtnList = document.querySelectorAll(".complete-btn");
  completeBtnList.forEach((completeBtn) => {
    completeBtn.addEventListener("click", (e) => {
      if (e.target.textContent === "Complete") e.target.textContent = "Undo";
      else e.target.textContent = "Complete";
    });
  });

  // edit
  let editBtnList = document.querySelectorAll(".edit-btn");

  editBtnList.forEach((editBtn) => {
    editBtn.addEventListener("click", editTask);
  });

  function editTask(e) {
    const currentTaskElement = e.target.closest(".task");

    let currentTaskNameElement = currentTaskElement.querySelector(".task-name");

    let textArea = document.createElement("textarea");
    textArea.value = currentTaskNameElement.textContent;
    currentTaskNameElement.replaceWith(textArea);

    const editButton = e.target;
    editButton.textContent = "Save";
    editButton.classList.replace("edit-btn", "save-btn");

    editButton.removeEventListener("click", editTask);
    editButton.addEventListener("click", saveTask);
  }

  function saveTask(e) {
    const index = e.target.getAttribute("data-index");
    const currentTaskElement = e.target.closest(".task");

    let textArea = currentTaskElement.querySelector("textarea");

    let newTaskNameElement = document.createElement("p");
    newTaskNameElement.classList.add("task-name");
    newTaskNameElement.textContent = textArea.value;
    textArea.replaceWith(newTaskNameElement);

    const saveButton = e.target;
    saveButton.textContent = "Edit";
    saveButton.classList.replace("save-btn", "edit-btn");
    saveButton.removeEventListener("click", saveTask);
    saveButton.addEventListener("click", editTask);
    tasks[index].name = newTaskNameElement.textContent;
  }

  // delete

  let deleteBtnList=document.querySelectorAll(".delete-btn");
  deleteBtnList.forEach( deleteBtn => {
    deleteBtn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      tasks.splice(index,1);
      renderTask();
    })
  })
}

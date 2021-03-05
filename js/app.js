const mainListForm = document.querySelector("#main-list__form");
const taskDetailsForm = document.querySelector("#task-details__form");
const mainListContainer = document.querySelector(".main-list__container");
const taskDetailsContainer = document.querySelector(".task-details__container");
const taskHeading = document.querySelector(".task-details__heading");
const taskLeftSpan = document.querySelector(".task-left");
let data = [];

// functions

const findDuplicates = (arr, text) => {
  return arr.findIndex(
    (task) => task.name.toLowerCase() === text.toLowerCase()
  );
};

const findTask = (text) => {
  return data.find((item) => item.name.toLowerCase() === text.toLowerCase());
};

const populateTaskDetails = (taskObj) => {
  // setting the data attribute, to target it later on
  taskHeading.setAttribute("data-name", taskObj.name);
  if (!taskObj.tasks)
    taskHeading.innerHTML = `<h2 class="task-details__heading">
  ${taskObj.name} <span>0 Tasks Left</span>`;
};

const createMainTaskElement = (text) => {
  const li = document.createElement("li");
  li.textContent = text;
  li.addEventListener("click", (e) => {
    // find the corresponding task
    const task = findTask(e.target.textContent);
    // show the task details to the user
    populateTaskDetails(task);
  });
  mainListContainer.appendChild(li);
};

const taskDetailsHTML = (text) => {
  return `<label>
    <input type="checkbox" id="hide-complete" />
    ${text}
  </label>`;
};

const getTasksLeft = (arr) => {
  return arr.filter((item) => !item.comlpleted);
};

const render = (type) => {
  if (type === "main") {
    mainListContainer.innerHTML = "";
    data.forEach((item) => createMainTaskElement(item.name));
  } else if (type === "tasks") {
  }
};

// event listeners
mainListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const type = "main";
  const newTask = e.target.elements.mainText.value;
  const duplicate = findDuplicates(data, newTask);
  duplicate === -1
    ? data.push({ name: newTask, tasks: [] })
    : alert("no duplicates!");
  render(type);
  e.target.elements.mainText.value = "";
});

taskDetailsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const type = "tasks";
  const task = e.target.elements.detailsText.value;
  const mainTask = findTask(taskHeading.getAttribute("data-name"));
  const duplicate = findDuplicates(mainTask.tasks);
  if (duplicate === -1) mainTask.tasks.push({ text: task, comlpleted: false });
});

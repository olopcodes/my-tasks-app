// functions
const getSavedData = () => {
  // checking if saved data
  const notesJSON = localStorage.getItem("data");
  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

const saveData = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};

const findTitle = (text) => {
  // { title: newMainTask, tasks: [] }
  return data.find((title) => title.title === text);
};

const findTask = (mainTitle, textTask) => {
  // { title: newMainTask, tasks: [] }
  const title = findTitle(mainTitle);
  // if undefined, means nothing in there
  return title.tasks.find((task) => task.text === textTask);
};

const inputCheck = (text) => {
  // is the text a string and at least 3 characters
  if (isNaN(text) && text.length >= 3) {
    return true;
  } else {
    return false;
  }
};

const createMainTaskElement = (text) => {
  const li = document.createElement("li");
  li.textContent = text;
  li.addEventListener("click", (e) => {
    // use the info from here to populate the tasks
    document.querySelector(".task-list").classList.add("show");
    populateTaskInfo(findTitle(li.textContent));
  });
  mainListContainer.appendChild(li);
};

// const markCompleted = () => {

// }

const getTasksLeft = (title) => {
  const tasksLeft = title.tasks.filter((task) => !task.completed).length;
  return `${tasksLeft} Tasks Left`;
};

const taskDetailsHTML = (text) => {
  return `<label>
      <input type="checkbox" />
      ${text}
    </label>`;
};

const handleTaskInfo = (title) => {
  taskListHeadingSpan.textContent = getTasksLeft(title);
  taskListContainer.innerHTML = "";
  title.tasks.forEach(
    (task) => (taskListContainer.innerHTML += taskDetailsHTML(task.text))
  );
};

const populateTaskInfo = (title) => {
  taskListContainer.innerHTML = "";
  taskListHeading.textContent = title.title;
  if (title.tasks.length === 0) {
    taskListHeadingSpan.textContent = "0 Tasks Left";
  } else if (title.tasks.length > 0) {
    handleTaskInfo(title);
  }
  isHidden = false;
};

const showMainTitle = () => {
  mainListContainer.innerHTML = "";
  data.forEach((title) => createMainTaskElement(title.title));
};

const deleteList = () => {
  const index = data.findIndex(
    (title) => title.title === taskListHeading.textContent
  );
  data.splice(index, 1);
  showMainTitle();
};

const resetCompleted = () => {
  const title = findTitle(taskListHeading.textContent);
  title.tasks.forEach((task) => (task.completed = false));
  taskListHeadingSpan.textContent = getTasksLeft(title);
  removeChecked();
};

const removeChecked = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((check) => (check.checked = false));
};

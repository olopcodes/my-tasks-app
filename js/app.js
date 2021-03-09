"use strict";
const mainListForm = document.querySelector(".main-list__form");
const taskListForm = document.querySelector(".task-list__form");
const mainListContainer = document.querySelector(".main-list__container");
const taskListHeading = document.querySelector(".task-list__heading h2");
const taskListHeadingSpan = document.querySelector(".task-list__heading span");
const taskListContainer = document.querySelector(".task-list__container");
const taskListBtns = document.querySelector(".task-list__btns");
let isHidden = false;
const data = getSavedData();

// events
window.addEventListener("load", (e) => {
  if (data.length > 0) showMainTitle();
});

mainListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newMainTask = e.target.elements.mainText.value;
  const isValidText = inputCheck(newMainTask);
  const titleFound = findTitle(newMainTask);
  if (titleFound) return;
  if (isValidText) {
    data.push({ title: newMainTask, tasks: [] });
    saveData(data);
    createMainTaskElement(newMainTask);
  }
  e.target.elements.mainText.value = "";
});

taskListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newListTask = e.target.elements.listText.value;
  const title = findTitle(taskListHeading.textContent);
  const isValidText = inputCheck(newListTask);
  const hasTask =
    title.tasks.length > 0 ? findTask(title.title, newListTask) : false;
  if (hasTask) return;
  if (isValidText) title.tasks.push({ text: newListTask, completed: false });
  saveData(data);
  populateTaskInfo(title);
  e.target.elements.listText.value = "";
});

taskListContainer.addEventListener("change", (e) => {
  const title = taskListHeading.textContent;
  const textTask = e.target.closest("label").textContent.trim();
  const task = findTask(title, textTask);
  if (task) task.completed = !task.completed;
  taskListHeadingSpan.textContent = getTasksLeft(findTitle(title));
});

taskListBtns.addEventListener("click", (e) => {
  if (e.target.id === "delete") deleteList();
  if (e.target.id === "reset") resetCompleted();
});

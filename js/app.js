const mainListForm = document.querySelector("#main-list__form");
const taskDetailsForm = document.querySelector("#task-details__form");
const mainListContainer = document.querySelector(".main-list__container");
const taskDetailsContainer = document.querySelector(".task-details__container");
let data = [];
// functions
function renderItem(text, container, type) {
  // figure out how to differentiate between main and details
  let el;
  if (type === "mainBtn") {
    el = document.createElement("li");
    el.textContent = text;
  } else if (type === "detailsBtn") {
    el = document.createElement("label");
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.textContent = text;
    el.appendChild(input);
  }

  container.appendChild(el);

  // <label>
  //     <input type="checkbox" id="hide-complete" />
  //     build the website
  // </label>
}

// event listeners
mainListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   using the name attribute on the input you can get info from a form
  // dot notation form.element."nameOnInput".value
  const inputValue = e.target.elements.mainText.value;
  const type = e.target.elements.mainBtn.name;
  data.push({ name: inputValue, tasks: [] });
  renderItem(inputValue, mainListContainer, type);
  e.target.elements.mainText.value = "";
});

taskDetailsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // add the tasks in the right todo
  const inputValue = e.target.elements.detailsText.value;
  e.target.elements.detailsText.value = "";

  console.log(inputValue);
  //   const arrToUpdate = data.filter((item) => {
  //     return item.name === "sameName";
  //   });
  //   renderItem();
});

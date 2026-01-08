const main = document.createElement("main");

export function renderMain() {
  const form = renderForm();

  main.append(form);
}

function renderForm() {
  const form = document.createElement("form");
  form.classList.add("location");

  const label = document.createElement("label");
  const input = document.createElement("input");
  const btnSubmit = document.createElement("button");
  input.placeholder = "Enter a city";
  btnSubmit.textContent = "Get Weather!";

  label.append(input, btnSubmit);

  form.append(label);
  return form;
}

export function getLocation(form) {
  return form.querySelector("input").value;
}

export default main;

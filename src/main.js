import { format } from "date-fns";

const main = document.createElement("main");
let forecast = null;

export function renderMain(currentForecast) {
  forecast = currentForecast;
  const form = renderForm();
  const tableContainer = renderTableContainer();

  main.append(form, tableContainer);
}

export function updateForecasts(newForecast) {
  forecast = newForecast;
  updateTable();
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

function renderTableContainer() {
  const tableContainer = document.createElement("div");
  tableContainer.classList.add("table-container");

  const table = renderTable();
  tableContainer.append(table);

  return tableContainer;
}

function renderTable() {
  const table = document.createElement("table");

  const caption = renderCaption();
  const tableHead = renderTableHead();
  const tableBody = renderTableBody();

  table.append(caption, tableHead, tableBody);

  return table;
}

function renderCaption() {
  const caption = document.createElement("caption");

  const location = document.createElement("h2");
  location.textContent = forecast.resolvedAddress;
  const captionText = document.createElement("h2");
  captionText.textContent = "7-day weather forecast";

  caption.append(location, captionText);

  return caption;
}

function renderTableHead() {
  const tableHead = document.createElement("thead");
  const tableRow = document.createElement("tr");

  const rowHeader = renderRowHeader();
  rowHeader.textContent = "Date";
  tableRow.append(rowHeader);

  forecast.days.forEach((day) => {
    const columnHeader = document.createElement("th");
    columnHeader.scope = "col";
    const date = new Date(day.datetime);
    columnHeader.textContent = format(date, "M.d. EE");
    tableRow.append(columnHeader);
  });

  tableHead.append(tableRow);

  return tableHead;
}

function renderTableBody() {
  const tableBody = document.createElement("tbody");

  const rowWeather = renderRowWeather();
  const rowMinTemp = renderRowMinTemp();
  const rowMaxTemp = renderRowMaxTemp();
  const rowPrecipProb = renderRowPrecipProb();

  tableBody.append(rowWeather, rowMinTemp, rowMaxTemp, rowPrecipProb);

  return tableBody;
}

function renderRowWeather() {
  const rowWeather = document.createElement("tr");
  const rowHeader = renderRowHeader();
  rowHeader.textContent = "Weather";
  rowWeather.append(rowHeader);

  forecast.days.forEach((day) => {
    const tableData = document.createElement("td");
    const weatherIcon = document.createElement("img");
    import(`./img/${day.icon}.png`).then(
      (src) => (weatherIcon.src = src.default),
    );

    tableData.append(weatherIcon);
    rowWeather.append(tableData);
  });

  return rowWeather;
}

function renderRowMinTemp() {
  const rowMinTemp = document.createElement("tr");
  const rowHeader = renderRowHeader();
  rowHeader.textContent = "Minimum Temperature";
  rowMinTemp.append(rowHeader);

  forecast.days.forEach((day) => {
    const tableData = document.createElement("td");
    tableData.textContent = day.tempmin + "°C";
    rowMinTemp.append(tableData);
  });

  return rowMinTemp;
}

function renderRowMaxTemp() {
  const rowMaxTemp = document.createElement("tr");
  const rowHeader = renderRowHeader();
  rowHeader.textContent = "Maximum Temperature";
  rowMaxTemp.append(rowHeader);

  forecast.days.forEach((day) => {
    const tableData = document.createElement("td");
    tableData.textContent = day.tempmax + "°C";
    rowMaxTemp.append(tableData);
  });

  return rowMaxTemp;
}

function renderRowPrecipProb() {
  const rowPrecipProb = document.createElement("tr");
  const rowHeader = renderRowHeader();
  rowHeader.textContent = "Precipitation Probability";
  rowPrecipProb.append(rowHeader);

  forecast.days.forEach((day) => {
    const tableData = document.createElement("td");
    tableData.textContent = day.precipprob + "%";
    rowPrecipProb.append(tableData);
  });

  return rowPrecipProb;
}

function renderRowHeader() {
  const rowHeader = document.createElement("th");
  rowHeader.scope = "row";
  return rowHeader;
}

function updateTable() {
  const tableContainer = main.querySelector(".table-container");
  const newTableContainer = renderTableContainer();
  main.replaceChild(newTableContainer, tableContainer);
}

export default main;

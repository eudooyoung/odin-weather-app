import { format } from "date-fns";

const dailyTableContainer = document.createElement("div");
dailyTableContainer.classList.add("table-container", "daily");

let forecast = null;

export function renderDailyTableContainer(currentForecast) {
  forecast = currentForecast;
  const dailyTable = renderDailyTable();
  dailyTableContainer.append(dailyTable);
}

function renderDailyTable() {
  const table = document.createElement("table");

  const caption = renderDailyCaption();
  const tableHead = renderDailyTableHead();
  const tableBody = renderDailyTableBody();

  table.append(caption, tableHead, tableBody);

  return table;
}

function renderDailyCaption() {
  const caption = document.createElement("caption");

  const captionText = document.createElement("h2");
  captionText.textContent = `Daily weather forecast: ${forecast.resolvedAddress}`;

  caption.append(captionText);

  return caption;
}

function renderDailyTableHead() {
  const tableHead = document.createElement("thead");
  const tableRow = document.createElement("tr");

  const rowHeader = renderRowHeader("date");
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

function renderDailyTableBody() {
  const tableBody = document.createElement("tbody");

  const rowWeather = renderRowDailyWeather();
  const rowMinTemp = renderRowMinTemp();
  const rowMaxTemp = renderRowMaxTemp();
  const rowPrecipProb = renderRowDailyPrecipProb();

  tableBody.append(rowWeather, rowMinTemp, rowMaxTemp, rowPrecipProb);

  return tableBody;
}

function renderRowDailyWeather() {
  const rowWeather = document.createElement("tr");
  const rowHeader = renderRowHeader("weather");
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
  const rowHeader = renderRowHeader("minimum temperature");
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
  const rowHeader = renderRowHeader("maximum temperature");
  rowMaxTemp.append(rowHeader);

  forecast.days.forEach((day) => {
    const tableData = document.createElement("td");
    tableData.textContent = day.tempmax + "°C";
    rowMaxTemp.append(tableData);
  });

  return rowMaxTemp;
}

function renderRowDailyPrecipProb() {
  const rowPrecipProb = document.createElement("tr");
  const rowHeader = renderRowHeader("precipitation probability");
  rowPrecipProb.append(rowHeader);

  forecast.days.forEach((day) => {
    const tableData = document.createElement("td");
    tableData.textContent = day.precipprob + "%";
    rowPrecipProb.append(tableData);
  });

  return rowPrecipProb;
}

function renderRowHeader(text) {
  const rowHeader = document.createElement("th");
  rowHeader.scope = "row";
  rowHeader.textContent = text;
  return rowHeader;
}

export function updateForecast(newForecast) {
  forecast = newForecast;
}

export function updateTable() {
  const table = dailyTableContainer.querySelector("table");
  const newTable = renderDailyTable(forecast);
  dailyTableContainer.replaceChild(newTable, table);
}

export function getDailyColumns() {
  const tableRows = dailyTableContainer.querySelectorAll("tr");
  const columns = Array(16)
    .fill([])
    .map(() => Array(5).fill());
  for (let row = 0; row < tableRows.length; row++) {
    const tableRow = tableRows[row].childNodes;
    for (let col = 0; col < tableRow.length; col++) {
      columns[col][row] = tableRow[col];
      columns[col][row].classList.add(`col-${col}`);
    }
  }

  console.log(columns);
  return columns;
}

export function highlightColumn(columnName) {
  dailyTableContainer
    .querySelectorAll(`.${columnName}`)
    .forEach((cell) => cell.classList.add("highlighted"));
}

export function deHighlightColumn(columnName) {
  dailyTableContainer
    .querySelectorAll(`.${columnName}`)
    .forEach((cell) => cell.classList.remove("highlighted"));
}

export default dailyTableContainer;

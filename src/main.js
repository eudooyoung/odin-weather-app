import { format, addDays } from "date-fns";
import { getForeCasts } from "./forecast-storage";

const main = document.createElement("main");

export async function renderMain() {
  const table = await renderTable();

  main.append(table);
}

async function renderTable() {
  const table = document.createElement("table");
  const forecasts = await getForeCasts();

  const caption = renderCaption();
  const tableHead = renderTableHead(forecasts);
  const tableBody = renderTableBody(forecasts);

  table.append(caption, tableHead, tableBody);

  return table;
}

function renderCaption() {
  const caption = document.createElement("caption");

  const captionText = document.createElement("h2");
  captionText.textContent = "7-day weather forecast";

  caption.append(captionText);

  return caption;
}

function renderTableHead(forecasts) {
  const tableHead = document.createElement("thead");
  const tableRow = document.createElement("tr");

  const rowHeader = renderRowHeader();
  rowHeader.textContent = "Date";
  tableRow.append(rowHeader);

  forecasts.forEach((forecast) => {
    const columnHeader = document.createElement("th");
    columnHeader.scope = "col";
    columnHeader.textContent = forecast.datetime;
    tableRow.append(columnHeader);
  });

  tableHead.append(tableRow);

  return tableHead;
}

function renderTableBody(forecasts) {
  const tableBody = document.createElement("tbody");

  const rowWeather = renderRowWeather(forecasts);
  const rowMinTemp = renderRowMinTemp(forecasts);
  const rowMaxTemp = renderRowMaxTemp(forecasts);
  const rowPrecipProb = renderRowPrecipProb(forecasts);

  tableBody.append(rowWeather, rowMinTemp, rowMaxTemp, rowPrecipProb);

  return tableBody;
}

function renderRowWeather(forecasts) {
  const rowWeather = document.createElement("tr");
  const rowHeader = renderRowHeader();
  rowHeader.textContent = "Weather";
  rowWeather.append(rowHeader);

  forecasts.forEach((forecast) => {
    const tableData = document.createElement("td");
    tableData.textContent = forecast.icon;
    rowWeather.append(tableData);
  });

  return rowWeather;
}

function renderRowMinTemp(forecasts) {
  const rowMinTemp = document.createElement("tr");
  const rowHeader = renderRowHeader();
  rowHeader.textContent = "Minimum Temperature";
  rowMinTemp.append(rowHeader);

  forecasts.forEach((forecast) => {
    const tableData = document.createElement("td");
    tableData.textContent = forecast.tempmin;
    rowMinTemp.append(tableData);
  });

  return rowMinTemp;
}

function renderRowMaxTemp(forecasts) {
  const rowMaxTemp = document.createElement("tr");
  const rowHeader = renderRowHeader();
  rowHeader.textContent = "Maximum Temperature";
  rowMaxTemp.append(rowHeader);

  forecasts.forEach((forecast) => {
    const tableData = document.createElement("td");
    tableData.textContent = forecast.tempmax;
    rowMaxTemp.append(tableData);
  });

  return rowMaxTemp;
}

function renderRowPrecipProb(forecasts) {
  const rowPrecipProb = document.createElement("tr");
  const rowHeader = renderRowHeader();
  rowHeader.textContent = "Precipitation Probability";
  rowPrecipProb.append(rowHeader);

  forecasts.forEach((forecast) => {
    const tableData = document.createElement("td");
    tableData.textContent = forecast.precipprob;
    rowPrecipProb.append(tableData);
  });

  return rowPrecipProb;
}

function renderRowHeader() {
  const rowHeader = document.createElement("th");
  rowHeader.scope = "row";
  return rowHeader;
}

export default main;

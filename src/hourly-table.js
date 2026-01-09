import { format, isPast, parse } from "date-fns";

const hourlyTableContainer = document.createElement("div");
hourlyTableContainer.classList.add("table-container", "hourly");

let day = null;
let hourlyColumns = [];

export function renderHourlyTableContainer(currentDay) {
  day = currentDay;
  const hourlyTable = renderHourlyTable();
  hourlyTableContainer.append(hourlyTable);
  setHourlyColumns();
}

function renderHourlyTable() {
  const table = document.createElement("table");

  const caption = renderHourlyCaption();
  const tableHead = renderHourlyTableHead();
  const tableBody = renderHourlyTableBody();

  table.append(caption, tableHead, tableBody);

  return table;
}

function renderHourlyCaption() {
  const caption = document.createElement("caption");
  const captionTitle = document.createElement("h3");
  const datetimeFormatted = format(day.datetime, "yyyy-MM-dd EEEE");
  captionTitle.textContent = `Hourly Forecast: ${datetimeFormatted}`;
  caption.append(captionTitle);

  return caption;
}

function renderHourlyTableHead() {
  const tableHead = document.createElement("thead");
  const tableRow = document.createElement("tr");

  const rowHeader = renderRowHeader();
  rowHeader.textContent = "time";
  tableRow.append(rowHeader);

  day.hours.forEach((hour) => {
    const datetimeParsed = parse(hour.datetime, "HH:mm:ss", new Date());

    const columnHeader = document.createElement("th");
    columnHeader.scope = "col";
    const datetimeFormatted = format(datetimeParsed, "h a");
    columnHeader.textContent = datetimeFormatted;
    tableRow.append(columnHeader);
  });

  tableHead.append(tableRow);

  return tableHead;
}

function renderHourlyTableBody() {
  const tableBody = document.createElement("tbody");

  const rowWeather = renderRowHourlyWeather();
  const rowTemp = renderRowHourlyTemp();
  const rowPrecip = renderRowHourlyPrecip();
  const rowPrecipProb = renderRowHourlyPrecipProb();
  const rowHourlyWindDir = renderRowHourlyWindDir();
  const rowHourlyWindSpeed = renderRowHourlyWindSpeed();
  const rowHourlyHumidity = renderRowHourlyHumidity();

  tableBody.append(
    rowWeather,
    rowTemp,
    rowPrecip,
    rowPrecipProb,
    rowHourlyWindDir,
    rowHourlyWindSpeed,
    rowHourlyHumidity,
  );

  return tableBody;
}

function renderRowHourlyWeather() {
  const rowWeather = document.createElement("tr");
  const rowHeader = renderRowHeader("weather");
  rowWeather.append(rowHeader);

  day.hours.forEach((hour) => {
    const tableData = document.createElement("td");
    const weatherIcon = document.createElement("img");
    import(`./img/set1/${hour.icon}.png`).then(
      (src) => (weatherIcon.src = src.default),
    );

    tableData.append(weatherIcon);
    rowWeather.append(tableData);
  });

  return rowWeather;
}

function renderRowHourlyTemp() {
  const rowHourlyTemp = document.createElement("tr");
  const rowHeader = renderRowHeader("temperature");
  rowHourlyTemp.append(rowHeader);

  day.hours.forEach((hour) => {
    const tableData = document.createElement("td");
    tableData.textContent = hour.temp + "°C";
    rowHourlyTemp.append(tableData);
  });

  return rowHourlyTemp;
}

function renderRowHourlyPrecip() {
  const rowHourlyPrecip = document.createElement("tr");
  const rowHeader = renderRowHeader("precipitation");
  rowHourlyPrecip.append(rowHeader);

  day.hours.forEach((hour) => {
    const tableData = document.createElement("td");
    tableData.textContent = hour.precip + "mm";
    rowHourlyPrecip.append(tableData);
  });

  return rowHourlyPrecip;
}

function renderRowHourlyPrecipProb() {
  const rowHourlyPrecipProb = document.createElement("tr");
  const rowHeader = renderRowHeader("precipitation probability");
  rowHourlyPrecipProb.append(rowHeader);

  day.hours.forEach((hour) => {
    const tableData = document.createElement("td");
    tableData.textContent = hour.precipprob + "%";
    rowHourlyPrecipProb.append(tableData);
  });

  return rowHourlyPrecipProb;
}

function renderRowHourlyWindDir() {
  const rowHourlyWindDir = document.createElement("tr");
  const rowHeader = renderRowHeader("wind direction");
  rowHourlyWindDir.append(rowHeader);

  day.hours.forEach((hour) => {
    const tableData = document.createElement("td");
    const windArrow = document.createElement("img");
    windArrow.classList.add("wind-arrow");
    import("./img/wind-arrow.svg").then((src) => (windArrow.src = src.default));
    const degree = (hour.winddir + 180) % 360;
    windArrow.style.setProperty("--deg", `${degree}deg`);

    tableData.append(windArrow);
    rowHourlyWindDir.append(tableData);
  });

  return rowHourlyWindDir;
}

function renderRowHourlyWindSpeed() {
  const rowHourlyWindSpeed = document.createElement("tr");
  const rowHeader = renderRowHeader("wind speed");
  rowHourlyWindSpeed.append(rowHeader);

  day.hours.forEach((hour) => {
    const tableData = document.createElement("td");
    tableData.textContent = hour.windspeed + "km/h";
    rowHourlyWindSpeed.append(tableData);
  });

  return rowHourlyWindSpeed;
}

function renderRowHourlyHumidity() {
  const rowHourlyHumidity = document.createElement("tr");
  const rowHeader = renderRowHeader("humidity");
  rowHourlyHumidity.append(rowHeader);

  day.hours.forEach((hour) => {
    const tableData = document.createElement("td");
    tableData.textContent = hour.humidity + "%";
    rowHourlyHumidity.append(tableData);
  });

  return rowHourlyHumidity;
}

function renderRowHeader(text) {
  const rowHeader = document.createElement("th");
  rowHeader.scope = "row";
  rowHeader.textContent = text;
  return rowHeader;
}

export function updateDay(newDay) {
  day = newDay;
}

export function updateHourlyTable() {
  const table = hourlyTableContainer.querySelector("table");
  const newTable = renderHourlyTable();
  hourlyTableContainer.replaceChild(newTable, table);
  setHourlyColumns();
}

function setHourlyColumns() {
  const tableRows = hourlyTableContainer.querySelectorAll("tr");
  const columns = new Array(day.hours.length)
    .fill([])
    .map(() => Array(day.hours[0].length).fill());
  for (let row = 0; row < tableRows.length; row++) {
    const tableRow = tableRows[row].childNodes;
    for (let col = 1; col < tableRow.length; col++) {
      const colArrayIdx = col - 1;
      columns[colArrayIdx][row] = tableRow[col];
      columns[colArrayIdx][row].dataset.colId = colArrayIdx;
    }
  }
  hourlyColumns = columns;
}

export function highlightHourlyColumn(cell) {
  const columnIdx = Number(cell.dataset.colId);
  if (Number.isNaN(columnIdx)) return;
  hourlyColumns[columnIdx].forEach((cell) =>
    cell.classList.toggle("highlighted", true),
  );
}

export function deHighlightHourlyColumn(cell) {
  const columnIdx = Number(cell.dataset.colId);
  if (Number.isNaN(columnIdx)) return;
  hourlyColumns[columnIdx].forEach((cell) =>
    cell.classList.toggle("highlighted", false),
  );
}

export default hourlyTableContainer;

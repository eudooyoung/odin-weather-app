const hourlyTableContainer = document.createElement("div");
hourlyTableContainer.classList.add("table-container", "hourly");

let day = null;

export function renderHourlyTableContainer(currentDay) {
  day = currentDay;
  const hourlyTable = renderHourlyTable();
  hourlyTableContainer.append(hourlyTable);
}

export function renderHourlyTable() {
  const table = document.createElement("table");

  const caption = renderHourlyCaption();
  const tableHead = renderHourlyTableHead();
  const tableBody = renderHourlyTableBody();

  table.append(caption, tableHead);

  return table;
}

function renderHourlyCaption() {
  const caption = document.createElement("caption");
  const captionTitle = document.createElement("h3");

  captionTitle.textContent = "Hourly Forecast";
  caption.append(captionTitle);

  return caption;
}

function renderHourlyTableHead() {
  const tableHead = document.createElement("thead");
  const tableRow = document.createElement("tr");

  const rowHeader = renderRowHeader();
  rowHeader.textContent = "Time";
  tableRow.append(rowHeader);

  day.hours.forEach((hour) => {
    const columnHeader = document.createElement("th");
    columnHeader.scope = "col";
    columnHeader.textContent = hour.datetime;
    tableRow.append(columnHeader);
  });

  tableHead.append(tableRow);

  return tableHead;
}

function renderHourlyTableBody() {
  const tableBody = document.createElement("tbody");

  // const rowWeather = renderRowHourlyWeather();
  // const rowTemp = renderRowHourlyTemp();
  // const rowPrecip = renderRowHourlyPrecip();
  // const rowPrecipProb = renderRowHourlyPrecipProb();
  // const rowHourlyWindDir = renderRowHourlyWindDir();
  // const rowHourlyWindSpeed = renderRowHourlyWindSpeed();
  // const rowHourlyHumidity = renderRowHourlyHumidity();
}

function renderRowHeader() {
  const rowHeader = document.createElement("th");
  rowHeader.scope = "row";
  return rowHeader;
}

export default hourlyTableContainer;

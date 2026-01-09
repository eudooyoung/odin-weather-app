import { format, parse } from "date-fns";

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

  table.append(caption, tableHead, tableBody);

  return table;
}

function renderHourlyCaption() {
  const caption = document.createElement("caption");
  const captionTitle = document.createElement("h3");

  captionTitle.textContent = `Hourly Forecast: ${day.datetime}`;
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
    const datetimeParsed = parse(hour.datetime, "HH:mm:ss", new Date());
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
  const rowHeader = renderRowHeader("Weather");
  rowWeather.append(rowHeader);

  day.hours.forEach((hour) => {
    const tableData = document.createElement("td");
    const weatherIcon = document.createElement("img");
    import(`./img/${hour.icon}.png`).then(
      (src) => (weatherIcon.src = src.default),
    );

    tableData.append(weatherIcon);
    rowWeather.append(tableData);
  });

  return rowWeather;
}

function renderRowHourlyTemp() {
  const rowHourlyTemp = document.createElement("tr");
  const rowHeader = renderRowHeader("Temperature");
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
  const rowHeader = renderRowHeader("Precipitation");
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
  const rowHeader = renderRowHeader("Precipitation Probability");
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
  const rowHeader = renderRowHeader("Wind Direction");
  rowHourlyWindDir.append(rowHeader);

  day.hours.forEach((hour) => {
    const tableData = document.createElement("td");
    tableData.textContent = hour.winddir;
    rowHourlyWindDir.append(tableData);
  });

  return rowHourlyWindDir;
}

function renderRowHourlyWindSpeed() {
  const rowHourlyWindSpeed = document.createElement("tr");
  const rowHeader = renderRowHeader("Wind Speed");
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
  const rowHeader = renderRowHeader("Humidity");
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

export default hourlyTableContainer;

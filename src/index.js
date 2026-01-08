import "./styles.css";
import header, { renderHeader } from "./header.js";
import main, { renderMain, getLocation } from "./main.js";
import dailyTableContainer, {
  renderDailyTableContainer,
  updateForecast,
  updateTable,
  getDailyColumns,
  highlightColumn,
  deHighlightColumn,
} from "./daily-table.js";
import hourlyTableContainer, {
  renderHourlyTableContainer,
} from "./hourly-table.js";
import { getForecast } from "./forecast-storage.js";

const body = document.body;

async function init() {
  renderHeader();
  renderMain();
  const forecast = await getForecast();
  const day = forecast.days[0];
  renderDailyTableContainer(forecast);
  renderHourlyTableContainer(day);
  setColumnListeners();

  main.append(dailyTableContainer, hourlyTableContainer);
  body.append(header, main);
}

function setColumnListeners() {
  const columns = getDailyColumns();
  columns.forEach((column, columnIdx) => {
    if (columnIdx !== 0) {
      column.forEach((cell) => {
        highlightColumnHandler(cell);
        deHighlightColumnHandler(cell);
        clickColumnHandler(cell);
      });
    }
  });
}

function highlightColumnHandler(cell) {
  cell.addEventListener("mouseenter", (e) => {
    const columnName = e.target.className;
    highlightColumn(columnName);
  });
}

function deHighlightColumnHandler(cell) {
  cell.addEventListener("mouseleave", (e) => {
    const columnName = e.target.className.replace(" ", ".");
    deHighlightColumn(columnName);
  });
}

function clickColumnHandler(cell) {
  cell.addEventListener("mousedown", (e) => {
    const cell = e.target ? e.target.closest("td") : e.target;
    const columnName = cell.className.replace(" ", ".");
  });
}

main.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  if (form.matches(".location")) {
    const location = getLocation(form);
    const forecast = await getForecast(location);
    updateForecast(forecast);
    updateTable();
    setColumnListeners();
  }
});

init();

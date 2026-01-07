import "./styles.css";
import header, { renderHeader } from "./header.js";
import main, {
  renderMain,
  updateForecast,
  getLocation,
  getDailyColumns,
  highlightColumn,
  deHighlightColumn,
  getCurrentForecast,
} from "./main.js";
import { getForecast } from "./forecast-storage.js";

const body = document.body;

async function init() {
  renderHeader();
  const forecast = await getForecast();
  renderMain(forecast);
  setColumnListeners();

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
    const currentForecast = getCurrentForecast();
    console.log(currentForecast);
  });
}

main.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  if (form.matches(".location")) {
    const location = getLocation(form);
    const forecast = await getForecast(location);
    updateForecast(forecast);
    setColumnListeners();
  }
});

init();

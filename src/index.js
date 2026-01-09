import "./styles.css";
import header, { renderHeader } from "./header.js";
import main, { renderMain, getLocation } from "./main.js";
import dailyTableContainer, {
  renderDailyTableContainer,
  updateForecast,
  updateDailyTable,
  highlightDailyColumn,
  deHighlightDailyColumn,
  getCurrentForecast,
  pinDailyColumn,
} from "./daily-table.js";
import hourlyTableContainer, {
  renderHourlyTableContainer,
  updateDay,
  updateHourlyTable,
  highlightHourlyColumn,
  deHighlightHourlyColumn,
} from "./hourly-table.js";
import { getForecast } from "./forecast-storage.js";
import loading from "./loading.js";

const body = document.body;

async function init() {
  renderHeader();
  renderMain();

  main.append(loading);
  body.append(header, main);
  try {
    const forecast = await getForecast();
    const day = forecast.days[0];
    renderDailyTableContainer(forecast);
    renderHourlyTableContainer(day);
    pinDailyColumn(0);

    main.removeChild(loading);
    main.append(dailyTableContainer, hourlyTableContainer);
  } catch (error) {
    console.error(error);
  }
}

main.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  if (form.matches(".location")) {
    if (dailyTableContainer.isConnected) {
      main.removeChild(dailyTableContainer);
    }
    if (hourlyTableContainer.isConnected) {
      main.removeChild(hourlyTableContainer);
    }
    main.append(loading);
    const location = getLocation(form);
    try {
      const forecast = await getForecast(location);
      updateForecast(forecast);
      updateDailyTable();
      pinDailyColumn(0);

      if (loading.isConnected) main.removeChild(loading);
      main.append(dailyTableContainer, hourlyTableContainer);
    } catch (error) {
      if (loading.isConnected) main.removeChild(loading);

      console.error(error);
      const input = form.querySelector("input");
      input.setCustomValidity("Invalid address. Please check address again.");
      input.reportValidity();
    }
  }
});

main.addEventListener("input", (e) => {
  const input = e.target;
  input.setCustomValidity("");
});

dailyTableContainer.addEventListener("mouseover", (e) => {
  const cell = e.target.closest("th, td");
  if (!cell) return;
  highlightDailyColumn(cell);
});

dailyTableContainer.addEventListener("mouseout", (e) => {
  const cell = e.target.closest("th, td");
  if (!cell) return;
  deHighlightDailyColumn(cell);
});

dailyTableContainer.addEventListener("click", (e) => {
  const cell = e.target.closest("th, td");
  if (!cell) return;
  const colIdx = Number(cell.dataset.colId);
  if (Number.isNaN(colIdx)) return;
  pinDailyColumn(colIdx);

  const forecast = getCurrentForecast();
  const newDay = forecast.days[colIdx];
  updateDay(newDay);
  updateHourlyTable();
});

hourlyTableContainer.addEventListener("mouseover", (e) => {
  const cell = e.target.closest("th, td");
  if (!cell) return;
  highlightHourlyColumn(cell);
});

hourlyTableContainer.addEventListener("mouseout", (e) => {
  const cell = e.target.closest("th, td");
  if (!cell) return;
  deHighlightHourlyColumn(cell);
});

init();

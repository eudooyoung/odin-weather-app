import "./styles.css";
import header, { renderHeader } from "./header.js";
import main, { renderMain, updateForecasts, getLocation } from "./main.js";
import { getForecast } from "./forecast-storage.js";

const body = document.body;

async function init() {
  renderHeader();
  const forecast = await getForecast();
  renderMain(forecast);

  body.append(header, main);
}

main.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  if (form.matches(".location")) {
    const location = getLocation(form);
    const forecast = await getForecast(location);
    updateForecasts(forecast);
  }
});

init();

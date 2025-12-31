import "./styles.css";
import header, { renderHeader } from "./header.js";
import main, { renderMain } from "./main.js";
import { getRawData } from "./forecast-storage.js";
import { format, addDays } from "date-fns";

const body = document.body;

async function init() {
  renderHeader();
  await renderMain();

  body.append(header, main);
}

init();

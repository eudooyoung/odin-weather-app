import { format, addDays } from "date-fns";

const main = document.createElement("main");

export function renderMain() {
  const table = renderTable();

  main.append(table);
}

function renderTable() {
  const table = document.createElement("table");

  const caption = renderCaption();
  const tableHead = renderTableHead();

  table.append(caption, tableHead);

  return table;
}

function renderCaption() {
  const caption = document.createElement("caption");

  const captionText = document.createElement("h2");
  captionText.textContent = "7-day weather forecast";

  caption.append(captionText);

  return caption;
}

function renderTableHead() {
  const tableHead = document.createElement("thead");
  const tableRow = document.createElement("tr");

  const rowHeader = document.createElement("th");
  rowHeader.scope = "row";
  rowHeader.textContent = "Date";
  tableRow.append(rowHeader);

  for (let i = 0; i < 7; i++) {
    const columnHeader = document.createElement("th");
    columnHeader.scope = "col";
    columnHeader.textContent = getDate(i);
    tableRow.append(columnHeader);
  }

  tableHead.append(tableRow);

  return tableHead;
}

function getDate(i) {
  const today = new Date();
  const date = addDays(today, i);
  const dateFormatted = format(date, "yyyy-MM-dd");
  return dateFormatted;
}

export default main;

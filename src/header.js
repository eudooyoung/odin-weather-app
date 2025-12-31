const header = document.createElement("header");

export function renderHeader() {
  const banner = document.createElement("h1");
  banner.classList.add("banner");
  banner.textContent = "Weather App";

  header.append(banner);
}

export default header;

const footer = document.createElement("footer");

export function renderFooter() {
  const footerContent = document.createElement("div");

  footerContent.append(
    document.createTextNode("Weather data provided by "),
    renderLink("Visual Crossing", "https://www.visualcrossing.com/"),
    document.createTextNode(" · "),
    document.createTextNode("© 2026"),
    document.createTextNode(" · "),
    renderLink("GitHub", "https://github.com/eudooyoung/odin-weather-app.git"),
  );

  footer.append(footerContent);
}

function renderLink(text, linkAddress) {
  const link = document.createElement("a");
  link.textContent = text;
  link.href = linkAddress;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}

export default footer;

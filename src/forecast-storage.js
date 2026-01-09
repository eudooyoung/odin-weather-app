const API_KEY = "3TJJEBMMGEWLXASWDF9ABF67B";
const URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const params = new URLSearchParams({
  unitGroup: "metric",
  key: API_KEY,
  include: "days,hours",
  elements:
    "datetime,icon,precip,precipprob,tempmin,tempmax,temp,windspeed,winddir,humidity",
  iconSet: "icons2",
});

export async function getForecast(location = "Seoul") {
  location = location === "" ? "Seoul" : location;
  const endPoint = `${URL}${location}`;
  const parameters = params.toString();

  const response = await fetch(`${endPoint}?${parameters}`);
  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`,
    );
  }
  const forecast = await response.json();
  setDayIds(forecast);
  console.log(forecast);
  return forecast;
}

function setDayIds(forecast) {
  forecast.days.forEach((day, dayIdx) => (day.dayId = `D-${dayIdx}`));
}

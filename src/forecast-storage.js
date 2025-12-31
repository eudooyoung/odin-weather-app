const API_KEY = "3TJJEBMMGEWLXASWDF9ABF67B";
const URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

let rawData;

export function createForeCast(location = "Seoul") {}

export async function getRawData(location = "Seoul", startDate, endDate) {
  const endPoint = `${URL}${location}/${startDate}/${endDate}`;
  const params = new URLSearchParams({
    unitGroup: "metric",
    key: API_KEY,
    include: "days",
    elements: "datetime,icon,precipprob,tempmin,tempmax",
  });
  const parameters = params.toString();

  try {
    const response = await fetch(`${endPoint}?${parameters}`);
    rawData = await response.json();
    console.log(rawData);
    return rawData;
  } catch (error) {
    console.error(error);
  }
}

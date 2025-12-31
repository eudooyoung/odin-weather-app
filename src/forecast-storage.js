import { format, addDays } from "date-fns";

const API_KEY = "3TJJEBMMGEWLXASWDF9ABF67B";
const URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const startDate = format(new Date(), "yyyy-MM-dd");
const endDate = format(addDays(new Date(), 6), "yyyy-MM-dd");

export function createForeCast(location = "Seoul") {}

export async function getForeCasts(location = "Seoul") {
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
    const rawData = await response.json();
    console.log(rawData);
    return rawData.days;
  } catch (error) {
    console.error(error);
  }
}

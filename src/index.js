import "./styles.css";
import { format } from "date-fns";

const API_KEY = "3TJJEBMMGEWLXASWDF9ABF67B";
const url =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const location = "Seoul";

async function getWeather() {
  try {
    const response = await getResponse(url, location, API_KEY);
    const data = await getData(response);
    console.log(data);
  } catch (error) {
    console.error(error);
    console.log("try enter location again");
  }
}

function getResponse(url, location, key) {
  return fetch(`${url}${location}?unitGroup=metric&key=${key}`);
}

function getData(response) {
  return response.json();
}

console.log(format(new Date(), "yyyy-MM-dd"));

// getWeather();

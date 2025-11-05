function updateWeather(response) {
  let temp = Math.round(response.data.temperature.current);
  let cityTemp = document.querySelector(".weather-temp");
  let weatherDescription = document.querySelector("#description");
  let weatherHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let currentTime = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let weatherIcon = document.querySelector("#weather-icon");

  // update temp
  iconElement.style.display = "inline";
  cityTemp.innerHTML = temp;

  //update weather description
  weatherDescription.innerHTML = response.data.condition.description;

  //update humidity
  humidityElement.style.display = "inline";
  weatherHumidity.innerHTML = response.data.temperature.humidity;

  //update wind speed
  windSpeedElement.style.display = "inline";
  windSpeed.innerHTML = `${response.data.wind.speed} km/h`;

  //update time
  currentTime.innerHTML = `${formatDate(date)},`;

  //update icon

  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "24a6f34aet30b286677e3ofdb3c4aea0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#weather-city");
  city.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let humidityElement = document.getElementById("humidity-description");
humidityElement.style.display = "none";

let windSpeedElement = document.getElementById("wind-description");
windSpeedElement.style.display = "none";

let unitElement = document.getElementsByClassName("weather-unit");
unitElement.style.display = "none";

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

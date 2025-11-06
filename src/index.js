function updateWeather(response) {
  let temp = Math.round(response.data.temperature.current);
  let cityTemp = document.querySelector("#weather-temp");
  let weatherDescription = document.querySelector("#description");
  let weatherHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let currentTime = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let weatherIcon = document.querySelector("#weather-icon");

  // update temp
  unitElement.style.display = "inline";
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
  getForecast(response.data.city);
}

function formatDate(date) {
  let currentDate = new Date();
  let minutes = currentDate.getMinutes();
  let hours = currentDate.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function showForecast(response) {
  let forecastTemp = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastTemp =
        forecastTemp +
        `
  <div class="weather-forecast-data">
    <div class="weather-forecast-day">${formatDay(day.time)}</div>

    <img src="${day.condition.icon_url}" id="weather-icon" />

    <div class="weather-forecast-temps">
      <div class="weather-forecast temp">${Math.round(
        day.temperature.minimum
      )}°C</div>
      <div class="weather-forecast-temp">${Math.round(
        day.temperature.maximum
      )}°C</div>
    </div>
  </div>`;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastTemp;
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(showForecast);
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

let unitElement = document.getElementById("weather-unit");
unitElement.style.display = "none";

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

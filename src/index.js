function updateWeather(response) {
  let temp = Math.round(response.data.temperature.current);
  let cityTemp = document.querySelector(".weather-temp");
  // update temp
  cityTemp.innerHTML = temp;

  //update weather description
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.condition.description;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

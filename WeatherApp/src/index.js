let currentDate = new Date();

let dayArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = dayArray[currentDate.getDay()];
let currentTime = document.querySelector("#current-time");

currentTime.innerHTML = `${day},  ${currentDate.getHours()}h ${currentDate.getMinutes()}min`;

//

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp) + `ºC`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}
function search(city) {
  let apiKey = "44f068b5b5dfa7997cf44f718548aae8";
  let searchInput = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

let chooseCity = document.querySelector("#search-form");
chooseCity.addEventListener("submit", submitCity);

//

function showCurrentCity(response) {
  let currentCity = response.data.name;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${currentCity}`;
}

function handleLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiKey = "44f068b5b5dfa7997cf44f718548aae8";
  let positionTemperatureUrl = `${apiEndpoint}&appId=${apiKey}&lat=${lat}&lon=${lon}&units=metric`;

  axios.get(positionTemperatureUrl).then(showWeather);
  axios.get(positionTemperatureUrl).then(showCurrentCity);
}

function showCurrentLocationTemperature(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", showCurrentLocationTemperature);

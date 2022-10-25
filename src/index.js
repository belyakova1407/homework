let now = new Date();

let h3 = document.querySelector("h3");

let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h3.innerHTML = `${day} ${hours}:${minutes}`;

function currentTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let currentDegrees = document.querySelector("#currentDegrees");
  currentDegrees.innerHTML = `${temperature}`;
}

function changeCity(event) {
  event.preventDefault();
  let apiKey = "9eca7aac0b071aa16e3cb063adba0785";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let city = document.querySelector("#search-text-input").value;
  let units = "metric";

  axios
    .get(`${apiUrl}${city}&appid=${apiKey}&units=${units}`)
    .then(currentTemperature);
}

let citySearchForm = document.querySelector("#search-form");
citySearchForm.addEventListener("submit", changeCity);

let myLocation = document.querySelector("#current");
myLocation.addEventListener("click", geolocate);

function geolocate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(uploadCoordinates);

  function uploadCoordinates(response) {
    let latitude = response.coords.latitude;
    let longitude = response.coords.longitude;
    let apiKey = "9eca7aac0b071aa16e3cb063adba0785";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
    let units = "metric";
    axios
      .get(
        `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`
      )
      .then(uploadLocation);
    function uploadLocation(response) {
      let location = response.data.name;
      let city = document.querySelector("#city");
      city.innerHTML = location;
      let temperature = Math.round(response.data.main.temp);
      let currentDegrees = document.querySelector("#currentDegrees");
      currentDegrees.innerHTML = `${temperature}`;
    }
  }
}

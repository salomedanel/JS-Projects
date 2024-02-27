const errMsg = document.querySelector(".err-msg");
const icon = document.querySelector(".icon");
const loader = document.querySelector(".loader-container");

async function IqaApiCall() {
  try {
    const response = await fetch(
      `https://api.airvisual.com/v2/nearest_city?key=27349034-65a9-4c8c-8544-553efacc9aaf`
    );
    const rawData = await response.json();
    console.log(rawData);
    displayInfo(rawData);
    if (rawData.status === "fail") {
      loader.classList.remove("active");
      errMsg.textContent = `Error message from API call: ${rawData.data.message}`;
      icon.src = "meteo_icons/error.png";
    }
  } catch (error) {
    loader.classList.remove("active");
    errMsg.textContent = "Error message from API call: " + error.message;
    icon.src = "meteo_icons/error.png";
    return;
  }
}

const cityName = document.querySelector(".city-name");
const countryName = document.querySelector(".country-name");
const temperature = document.querySelector(".temperature");

function displayInfo(rawData) {
  const city = rawData.data.city;
  const country = rawData.data.country;
  const tp = rawData.data.current.weather.tp;
  const icid = rawData.data.current.weather.ic;

  icon.src = `meteo_icons/${icid}.png`;
  cityName.textContent = city;
  countryName.textContent = country;
  temperature.textContent = tp + "°";
  loader.classList.remove("active");
}

IqaApiCall();

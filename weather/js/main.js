const APIkey = `35e8594924804979940182423250707`;
const baseURL = `https://api.weatherapi.com/v1/`;
const container = document.getElementById("weather-container");
const searchInput=document.getElementById("location-input")



let weatherData = {};

const getDateDetils = (date) => {
  const dateDetails = new Date(date);
  const weekDay = dateDetails.toLocaleString("en-US", { weekday: "long" });
  const day = dateDetails.toLocaleString("en-US", { day: "2-digit" });
  const month = dateDetails.toLocaleString("en-US", { month: "long" });
  return { weekDay, day, month };
};

const displayWeatherData = (array) => {
  let cartona = ``;

  for (let i = 0; i < array.length; i++) {
    const { day, month, weekDay } = getDateDetils(array[i].date);

    cartona += `
      <div class="col-md-4 mb-5">
        <div class="card1 ${i === 0 || i === 2 ? `card-color2` : `card-color1`} rounded-3">
          <header class="d-flex ${i === 0 ? `justify-content-between` : `justify-content-center`} align-items-center p-2">
            ${i === 0 ? `
              <p class="day m-0">${weekDay}</p>
              <p class="date m-0">${day} ${month}</p>
            ` : `
              <div class="day m-0">${weekDay}</div>
            `}
          </header>

          <div class="body p-3 mh">
            <div class="forecast-content position-relative" id="current">
              ${i === 0 ? `
                <div class="location pt-4 pb-3 fs-5 main">${weatherData.location.name}</div>
                <div class="degree ">
                  <p class="num text-white pb-5">${weatherData.current.temp_c}<sup>o</sup>C</p>
                  <div class="forecast-icon icon position-absolute">
                    <img src="${weatherData.current.condition.icon}" alt="">
                  </div>
                </div>
                <div class="custom text-main pt-3 ">Clear</div>
                  <span class="main mt-lg-4"><img src="image/dev4.png" alt="" class="pe-2">20%</span>
                  <span class="ps-3 main"><img class="pe-2" src="image/dev5.png" alt="">18km/h</span>
                  <span class="ps-3 main"><img class="pe-2" src="image/dev6.png" alt="">East</span>
              ` : `
              <div class="text-center">
                <div class="sun pt-5 pb-2">
                  <img src="${array[i].day.condition.icon}" alt="">
                </div>
                <div class="degree fs-4">
                  <div class="num text-white">${array[i].day.maxtemp_c}<sup>o</sup>C</div>
                  <div class="num fs-6 main text-white">${array[i].day.mintemp_c}<sup>o</sup></div>
                </div>
                <div class="cloud text-main pt-3 pb-5">${array[i].day.condition.text}</div>
                </div>
              `}
       
            </div>
          </div>
        </div>
      </div>`;
  }

  container.innerHTML = cartona;
};

const getWeatherData = async (city = "cairo") => {
    if(city.length===0) getWeatherData();
    if(city.length<3) return;
  try {
    const response = await fetch(`${baseURL}forecast.json?key=${APIkey}&q=${city}&days=3`);
    const data = await response.json();

    if (!data.forecast || !data.forecast.forecastday || data.forecast.forecastday.length === 0) {
     
      container.innerHTML = "<p class='text-danger'>No forecast data available. Please check the API key or city name.</p>";
      return;
    }

    weatherData = data;
    displayWeatherData(weatherData.forecast.forecastday);
  } catch (error) {
    
    container.innerHTML = `<p class='text-danger'>Error loading data: ${error.message}</p>`;
  }
};

getWeatherData();
searchInput.addEventListener("input",(e)=>{
   
    getWeatherData( e.target.value)
})

navigator.geolocation.getCurrentPosition((data)=>{


getWeatherData(`${data.coords.latitude},${data.coords.longitude}`)


console.log("iiiiiii");



},(error)=>{
   getWeatherData();
   console.log("erorr");
   
    
})
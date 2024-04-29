const apiKey = "c259617b0e82c4778fbf92e691f8f62f";

let displayCity = document.querySelector(".city");
let temp = document.querySelector(".temp");
let humidity = document.getElementById("humidity");
let speed = document.getElementById("speed");
let button = document.querySelector("button");
let image = document.querySelector(".icon > img");
let condition = document.querySelector(".condition");

async function weather() {
    try {
      let cityName = document.querySelector("input").value;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
      let response = await fetch(url);
      let data = await response.json();

      if (!response.ok) {
        displayCity.innerHTML = "Please enter a valid city name";
        return;
      }
  
      displayCity.innerHTML = data.name;
      temp.innerHTML = Math.round(data.main.temp) + "°C";
      humidity.innerHTML = Math.round(data.main.humidity) + "%";
      speed.innerHTML = data.wind.speed + " miles/h";
      condition.innerHTML = data.weather[0].description;

      
  
      let weatherCondition = data.weather[0].main.toLowerCase();
      if(weatherCondition == 'clear'){
        image.src = "./images/clear.svg";
      }else if(weatherCondition == 'clouds'){
        image.src = "./images/cloud.svg";
      }else if(weatherCondition == 'rain'){
        image.src = "./images/rain.svg";
      }else if(weatherCondition == 'snow'){
        image.src = "./images/snow.svg";
      }else if(weatherCondition == 'haze'){
        image.src = "./images/haze.svg";
      }else{
        image.src = "./images/cloud.svg";
      }
  
      console.log(data);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
    let tl = gsap.timeline();

tl.from(".icon img", { duration: .5, scale: 0, opacity: 0, ease: "bounce" });
tl.from(".city", { duration: .5, scale: 0, opacity: 0, ease: "back" });
tl.from(".temp", { duration: .5, scale: 0, opacity: 0, ease: "back" });
tl.from(".condition", { duration: .5, scale: 0, opacity: 0, ease: "back" });
tl.from(".humidity", { duration: .5, x: -1000, opacity: 0,  });
gsap.from(".wind", {delay:2, duration: .5, x: 1000, opacity: 0, });
  }

button.addEventListener("click", weather);




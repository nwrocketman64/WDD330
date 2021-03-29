// This object will hold all the weather information.
let weatherInfo = {
    currentCond: "unknown",
    currentTemp: "unknown",
    highTemp: "unknown",
    lowTemp: "unknown",
    windSpeed: "unknown",
    humidity: "unknown",
    windChill: "unknown",
    lat: 43.8231,
    lon: -111.7924,
    output1: "unknown",
    output2: "unknown",
    output3: "unknown",
    output4: "unknown",
    output5: "unknown"
};

// What the script should do once the page has loaded.
window.addEventListener('load', (event)=>{
    // Code for getting the current date.
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateObject = new Date()
    var currentDate = days[dateObject.getDay()] + ", " + dateObject.getDate() + " " + months[dateObject.getMonth()] + " " + dateObject.getFullYear();

    // Code that puts in the date.
    const lu = document.querySelector("#lastupdated");
    lu.textContent = currentDate

    const cry = document.querySelector("#copyrightyear");
    cry.textContent = new Date().getFullYear();
    
    // Get the user's location.
    geolocate();
});

const startup = function(){
    // The urls for the weather api.
    // const apiurl = "https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=f35b728b9784b1eaf04baa7a3e381718&units=imperial";
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?lat=" + weatherInfo.lat + "&lon=" + weatherInfo.lon + "&appid=f35b728b9784b1eaf04baa7a3e381718&units=imperial";
    const api5url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + weatherInfo.lat + "&lon=" + weatherInfo.lon + "&appid=f35b728b9784b1eaf04baa7a3e381718";

    // Get the data for current weather in the form of a JSON file
    fetch(apiurl)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        // Set the town name.
        document.getElementById("townName").textContent = jsonObject.name + ", " + jsonObject.sys.country;

        // Set the current condition.
        weatherInfo.currentCond = jsonObject.weather[0]["main"];
        document.getElementById("currCond").textContent = weatherInfo.currentCond;

        // Set the current Temperature.
        weatherInfo.currentTemp = Math.floor(jsonObject.main.temp);
        document.getElementById("currentTemp").innerHTML = weatherInfo.currentTemp + "&#8457;";

        // Set the highs and lows.
        weatherInfo.highTemp = Math.floor(jsonObject.main.temp_max);
        weatherInfo.lowTemp = Math.floor(jsonObject.main.temp_min);

        document.getElementById("highTemp").innerHTML = weatherInfo.highTemp + "&#8457;";
        document.getElementById("lowTemp").innerHTML = weatherInfo.lowTemp + "&#8457;";

        // Set the current humidity.
        weatherInfo.humidity = Math.floor(jsonObject.main.humidity);
        document.getElementById("humidity").textContent = weatherInfo.humidity;

        // Set the current wind speed.
        weatherInfo.windSpeed = jsonObject.wind.speed;
        document.getElementById("windSpeed").textContent = weatherInfo.windSpeed + " mph";

        // Calculate the windchill.
        weatherInfo.windChill = windChillCal(jsonObject.main.temp, jsonObject.wind.speed);

        // Code that puts in the windchill factor.
        const windChill = document.getElementById("windChill");
        windChill.innerHTML = weatherInfo.windChill  + "&#8457;";

        // Choose the correct background.
        // Get the image element.
        heroBanner = document.getElementById("hBanner");

        // Pick the right image and put it in the page.
        switch (jsonObject.weather[0]["description"]){
            case "clear sky":
                heroBanner.setAttribute("src", "img/clear-sky.jpg");
                break;

            case "few clouds":
                heroBanner.setAttribute("src", "img/few-clouds.jpg");
                break;

            case "scattered clouds":
                heroBanner.setAttribute("src", "img/scatter-clouds.jpg");
                break;

            case "broken clouds":
                heroBanner.setAttribute("src", "img/broken-clouds.jpg");
                break;

            case "shower rain":
                heroBanner.setAttribute("src", "img/shower-rain.jpg");
                break;

            case "rain":
                heroBanner.setAttribute("src", "img/rain.jpg");
                break;

            case "thunderstorm":
                heroBanner.setAttribute("src", "img/thunderstorm.jpg");
                break;

            case "snow":
                heroBanner.setAttribute("src", "img/snow.jpg");
                break;

            case "mist":
                heroBanner.setAttribute("src", "img/mist.jpg");
                break;
        }
    });

    // Get the data for current weather in the form of a JSON file
    fetch(api5url)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        // Pass the weather list from the json file.
        const weatherList = jsonObject["list"];

        // Setup the days in the week.
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        // Setup the counter.
        let num = 0;
        // Loop through each item in the list adding each card.
        for (i = 0; i < weatherList.length; i++) {
            // Find the time stamp and put it in a date object.
            let forcastTime = new Date(weatherList[i].dt_txt)

            // Add the card if the hour is 18.
            if (forcastTime.getHours() == 18){
                // Add one to the counter.
                num = num + 1;

                // Setup the document ids.
                let page_id = "label" + num;
                let page_img = "img" + num;
                let page_output = "output" + num;

                // Convert the temperature from Kelvin to Farenheit.
                let currentTemp = Math.floor((weatherList[i].main.temp - 273.15) * (9 / 5) + 32);

                // Label the day for that card.
                document.getElementById(page_id).textContent = days[forcastTime.getDay()];

                // Add the temperature for that card.
                document.getElementById(page_output).innerHTML = currentTemp + "&#8457;";

                // Create the image link and add it to the card.
                let imagesrc = 'https://openweathermap.org/img/w/' + weatherList[i].weather[0].icon + '.png';  // note the concatenation
                document.getElementById(page_img).setAttribute('src', imagesrc);

                // Add the temperature to weather info.
                weatherInfo["output" + num] = currentTemp;
            }
        }
    });
};

// The function calculates the windchill.
const windChillCal = function(temp, speed){
    // Setup the variables.
    var text;

    // Calculate the windchill.
    if (speed >= 3 && temp <= 50){
        text = (parseInt(35.74 + (0.6215 * temp) - (35.75 * (speed ** 0.16)) + (0.4275 * temp * (speed ** 0.16))));
    } else {
        text = "N/A"
    }

    // Return the windchill
    return text;
};

// The function puts metric values on the page.
const computeMetric = function(){
    // Set the current Temperature.
    document.getElementById("currentTemp").innerHTML = Math.floor(toCel(weatherInfo.currentTemp)) + "&#8451;";

    // Set the highs and lows.
    document.getElementById("highTemp").innerHTML = Math.floor(toCel(weatherInfo.highTemp)) + "&#8451;";
    document.getElementById("lowTemp").innerHTML = Math.floor(toCel(weatherInfo.lowTemp)) + "&#8451;";
    
    // Set the wind chill.
    document.getElementById("windChill").innerHTML = Math.floor(toCel(weatherInfo.windChill)) + "&#8451;";

    // Set the current wind speed.
    document.getElementById("windSpeed").textContent = Math.floor(weatherInfo.windSpeed / 2.237) + " meters";

    // Change the button.
    document.getElementById("convertValues").textContent = "Convert to Imperial";
    document.getElementById("convertValues").setAttribute("onclick", "computeImperial()");

    // Update the forcast.
    document.getElementById("output1").innerHTML = Math.floor(toCel(weatherInfo.output1)) + "&#8451;";
    document.getElementById("output2").innerHTML = Math.floor(toCel(weatherInfo.output2)) + "&#8451;";
    document.getElementById("output3").innerHTML = Math.floor(toCel(weatherInfo.output3)) + "&#8451;";
    document.getElementById("output4").innerHTML = Math.floor(toCel(weatherInfo.output4)) + "&#8451;";
    document.getElementById("output5").innerHTML = Math.floor(toCel(weatherInfo.output5)) + "&#8451;";
};

// The function converts fah to cel.
const toCel = function(fDegrees){
    // Convert the value and return it.
    return (fDegrees - 32) * 5 / 9;
};

// The function puts imperial values on the page.
const computeImperial = function(){
    // Set the current Temperature.
    document.getElementById("currentTemp").innerHTML = weatherInfo.currentTemp + "&#8457;";

    // Set the highs and lows.
    document.getElementById("highTemp").innerHTML = weatherInfo.highTemp + "&#8457;";
    document.getElementById("lowTemp").innerHTML = weatherInfo.lowTemp + "&#8457;";

    // Set the wind chill.
    document.getElementById("windChill").innerHTML = weatherInfo.windChill + "&#8457;";

    // Set the current wind speed.
    document.getElementById("windSpeed").textContent = weatherInfo.windSpeed + " mph";

    // Change the button.
    document.getElementById("convertValues").textContent = "Convert to Metric";
    document.getElementById("convertValues").setAttribute("onclick", "computeMetric()");

    // Update the forcast.
    document.getElementById("output1").innerHTML = weatherInfo.output1 + "&#8457;";
    document.getElementById("output2").innerHTML = weatherInfo.output2 + "&#8457;";
    document.getElementById("output3").innerHTML = weatherInfo.output3 + "&#8457;";
    document.getElementById("output4").innerHTML = weatherInfo.output4 + "&#8457;";
    document.getElementById("output5").innerHTML = weatherInfo.output5 + "&#8457;";
};

// The function triggers a reload of the page.
const refresh = function(){location.reload();};

// The function toggle the 5 day forcast.
const toggleForcast = function(){
    // Get the display element.
    let dayForcast = document.getElementById("forcast");

    // Get the current value of display element.
    let displaySetting = dayForcast.style.display;

    // Toggle the display denpending on the current setting.
    if (displaySetting == "block"){
        // Hide the display
        dayForcast.classList.add("hide");
        setTimeout(function(){dayForcast.style.display = "none"}, 1000);

        // Change the text on the button.
        document.getElementById("showForcast").textContent = "Show Forcast";
    } else {
        // Show the display
        dayForcast.style.display = "block";
        setTimeout(function(){dayForcast.classList.remove("hide")}, 1);

        // Change the text on the button.
        document.getElementById("showForcast").textContent = "Hide Forcast";
    };
};

// The function gets the user's location.
const geolocate = function(){
    // If there is no geolocation function.
    if(!navigator.geolocation) {
        // Set Rexburg as the default.
        weatherInfo.lat = 43.8231;
        weatherInfo.lon = 111.7924;

        // Call the startup function.
        startup();
    } else {
        // If there is, get the current position and call the call back functions.
        navigator.geolocation.getCurrentPosition(success, error);
    }
};

// The function sets the users current location if possible.
function success(position) {
    // Save the location information.
    weatherInfo.lat = position.coords.latitude;
    weatherInfo.lon = position.coords.longitude;
    
    // Call the startup function.
    startup();
}

// The function sets the default location if fails.
function error() {
    // If failed, set Rexburg, Idaho as the default.
    weatherInfo.lat = 43.8231;
    weatherInfo.lon = 111.7924;

    // Call the startup function.
    startup();
}
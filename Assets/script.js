console.log("JS is loaded");
// Variables
const  citySearch = document.getElementById("citySearch")
const searchBtn = document.getElementById("searchBtn")
const historyBtn = document.getElementById("history-btn")
let searchHistory = []
var keyID = 'bd264bda2339694f1d8b05eeddb26285'

let weatherSearch = 'https://api.openweathermap.org/data/2.5/forecast?q='+ citySearch +'&appid='+ keyID

// Functions
function clickHandler(e) {
    e.preventDefault()
    const userInput = citySearch.value.trim()
    console.log (userInput)
    getGeo(userInput)

}
function savedHistory(userInput) {
    searchHistory.push(userInput)
    localStorage.setItem("cityHistory", JSON.stringify(searchHistory))
    printHistory()
}
function printHistory() {
    historyBtn.textContent = ""
    for (let i = searchHistory.length -1 ; i >= 0; i--) {
       var btn = document.createElement('button')
       btn.setAttribute('type', 'button')
       btn.setAttribute('class', 'btn-history')
       btn.setAttribute('data-search', searchHistory[i])
        btn.textContent = searchHistory[i]
        historyBtn.append(btn)
    }
//historyBtn event.target 
//redefine value to userInput & go to getGeo   
//if I click btn-history 
//if  I take value  
}
function initHistory() {
    var searched = localStorage.getItem('cityHistory')
    if (searched) {
        searchHistory = JSON.parse(searched)  
    } 
    printHistory()
}
initHistory()
//Next fucntion use the user input for the GEO API
function getGeo(userInput) {
    var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${keyID}`
    console.log(userInput)

    fetch(apiURL)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
    savedHistory(userInput)    
    

    cityForecast(data[0])

    })
    
}
//Use the geoAPI data for the weatherAPI
function cityForecast(cityCoords) {
    //var cityCoords= data[0]
    console.log(cityCoords)
var {lat ,lon } = cityCoords
var city = cityCoords.name
    //fetch
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${keyID}&units=imperial`
    

    fetch(apiURL)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        currentDay(data.list[0].main, city, data.list[0].weather[0].icon)
        forecastCard(data.list)
  

    })
}
//currentDay is for 1 day; name, date, imgIcon, temp, humidity, wind into a card
    function currentDay(weather, city, icon) {
        console.log(weather, city)
        var day = document.getElementById('currentDay')
        // day.textContent= city
        
        //create variables that rep the data
        var date = new Date()
        var today = date.toLocaleDateString()
        var temp= weather.temp
        var humidity= weather.humidity
        var wind = weather.wind
        var img = icon
        
    console.log(date, temp, humidity, wind)

    //create the card 
var card = document.createElement('div')
        card.classList.add('card')
        //creating the city title
var title = document.createElement('h3')
    title.setAttribute('class', "card-title")
    title.textContent = city     
    // creating the card body that includes the data   
    var cardBody = document.createElement('div')
    cardBody.setAttribute('class',"card-body")
    
        //creating the <p> that hold the data
var dateEL = document.createElement('p')
        dateEL.setAttribute('class', "card-date") 
        dateEL.textContent = `date: ${today}`
var tempEL = document.createElement('p')
    tempEL.setAttribute('class',"card-text")
        tempEL.textContent= `temp: ${temp}`
var imgEL = document.createElement('img')
        imgEL.setAttribute('src',`https://openweathermap.org/img/wn/${img}.png`)    
var humidEL = document.createElement('p')
    humidEL.setAttribute('class',"card-text")
        humidEL.textContent= `humidity: ${humidity}`
        var windEL = document.createElement('p')
    windEL.setAttribute('class',"card-text")
        windEL.textContent= `wind: ${wind}`
        //appending title to the card
        card.appendChild(title)
        // appending card body into card
        card.appendChild(cardBody);
        //appending card to day
        day.appendChild(card);
        //appending all <p> to card body
        cardBody.append(dateEL, tempEL, imgEL, humidEL, windEL);  
        
        

// display the data to the card, then need to append
    }

//forecast is for 5 days; date, temp, img, humidity, wind into 5 cards
function forecastCard(forecast) {
    console.log(forecast)
    var cardContainer = document.getElementById('5DayCard')

    for (let i = 0; i < 5; i++) {
        const weather = forecast[i];
            // create variables that rep the data
            var date = weather.dt_txt
            var temp= weather.main.temp
            var humidity= weather.main.humidity
            var wind = weather.wind.speed
            var img = weather.weather[0].icon
        console.log(date, temp, humidity, wind, img)
    
//create the card 
    var card = document.createElement('div')
            card.classList.add('card')
 // creating the card body that includes the data   
    var cardBody = document.createElement('div')
            cardBody.setAttribute('class',"card-body")
 //creating the <p> that hold the data
    var dateEL = document.createElement('p')
        dateEL.setAttribute('class', "card-date") 
            dateEL.textContent = `date: ${date}`
    var tempEL = document.createElement('p')
        tempEL.setAttribute('class',"card-text")
            tempEL.textContent= `temp: ${temp}`
    var imgEL = document.createElement('img')
        imgEL.setAttribute('src',`https://openweathermap.org/img/wn/${img}.png`)
    var humidEL = document.createElement('p')
        humidEL.setAttribute('class',"card-text")
            humidEL.textContent= `humidity: ${humidity}`
    var windEL = document.createElement('p')
        windEL.setAttribute('class',"card-text")
            windEL.textContent= `wind: ${wind}`
           
            // appending card body into card
            card.appendChild(cardBody);
            //appending card to day
            cardContainer.appendChild(card);
            //appending all <p> to card body
            cardBody.append(dateEL, tempEL, imgEL, humidEL, windEL);  
    }
}
// WHEN I search for a city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

// WHEN I view current weather conditions for that city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// Special Functions
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
//Add city to search history (localStorage)
// if (localStorage.getItem("cities")) {
// 	storedCities = JSON.parse(localStorage.getItem("cities"));
// 	console.log(storedCities);
// 	for (var i = 0; i < storedCities.length; i++) {
// 		lastCitySearched = storedCities.length - 1;
// 		var lastCity = storedCities[lastCitySearched];
// 	}
// } else {
// 	cities;
// }
// renderLastCityInfo();
// console.log("cities", cities);

// // Busniess logic
//button to enter (eventListener)
searchBtn.addEventListener("click", clickHandler);




//Open webpage
    //see search bar to enter city
//After entering city get results of weather for next 5 days
    //Use of API info
    // https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
    
    //city name , date, temperature, humidity, windspeed appear as text
    //image of current weather conditions
 //Create search history bar/aside
    //displays previous cities search for
    //links to present their data again if clicked)   

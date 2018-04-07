import { GoogleMapsApi } from './gmap.class.js';

var map;

var service;


function initMap(lat = 32.0749831, lng = 34.9120554) {

    console.log('InitMap');

    const gmapApi = new GoogleMapsApi();
    return gmapApi.load()
        .then(() => {
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15,
                zoomControl: true,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                scaleControl: true,
                streetViewControl: true,
                rotateControl: true,
                fullscreenControl: true,
                mapTypeControl: true,
                disableDefaultUI: true
            })
               //////////auto complete for search input/////////
               var defaultBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(-33.8902, 151.1759),
                new google.maps.LatLng(-33.8474, 151.2631));
                var options = {
                bounds: defaultBounds,
              };
               var input = document.getElementById('autocomplete');
               var autocomplete = new google.maps.places.Autocomplete(input, options);
               /////////////adding new btns to map controls///////////
                var search = document.querySelector('.search');
                map.controls[google.maps.ControlPosition.TOP_LEFT].push(search);
                var myLoc = document.querySelector('.location-btns');
                map.controls[google.maps.ControlPosition.TOP_RIGHT].push(myLoc);
                var weather = document.querySelector('.dropdown');
                map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(weather);
            });
}

  



function addMarker(loc) {
            var marker = new google.maps.Marker({
                position: loc,
                map: map,
                icon: 'img/marker.png'
            });
            console.log('adding marker');
}


function setCenter(loc) {
    map.setCenter(loc);
    console.log('marker set center');
}

function getWeather(loc) {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${loc.lat}&lon=${loc.lng}&APPID=cbec6861886248c18ee69495f839b772`)
        .then(function (res) {
            console.log('weather data',res.data);
            renderWeather(res.data);
        })
}


function renderWeather(weather) {
    var elWeather = document.querySelector('.weather-info');
    var elWeatherBtn = document.querySelector('.weather-info-btn');
    var strHtml = `
 <h2 id="city">${weather.name}</h2>
  <div class="clean-list flex align-center">
   <h1 id="temp">${Math.floor(weather.main.temp - 273.15)}<span>&#176;</span></h1>
   <img class="weather-icon" src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png" alt="">
  </div>
`;
  var strHtmlBtn = `
  <p>Current Weather</p> 
  <h2 id="city">${weather.name}, ${weather.sys.country}</h2>
  <h3 id="desc">${weather.weather[0].description}</h3> 
   <div class="clean-list flex align-center">
    <h1 id="temp">${Math.floor(weather.main.temp - 273.15)}<span>&#176;</span></h1>
    <img class="weather-icon" src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png" alt="">
   </div>
 `;
    elWeather.innerHTML = strHtml;
    elWeatherBtn.innerHTML = strHtmlBtn;
}

function copyUrl(text){
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
  document.body.removeChild(textArea);
}


export default {
    initMap,
    addMarker,
    setCenter,
    getWeather,
    copyUrl
}




//google api key: AIzaSyBSwBN9DWvwKbCTD8_iLPOZJwRwZGj3-aE

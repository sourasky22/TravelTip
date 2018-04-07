console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'

var gLoc;

locService.getLocs()
    .then(locs => console.log('locs', locs))

    window.onload = ()=>{
    mapService.initMap()
    .then(
        ()=>{
            mapService.addMarker({lat: 32.0749831, lng: 34.9120554});
        }
    );
    locService.getPosition()
        .then(pos => {
            var loc = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
              };
              mapService.addMarker(loc);
              mapService.setCenter(loc);
              mapService.getWeather(loc);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}


//search for location
document.querySelector('.search').addEventListener('submit', (ev)=>{
    ev.preventDefault();
    console.log('Aha!', ev.target.location.value);
    var address = ev.target.location.value;
    locService.getCords(address)   
    .then(pos => {
          mapService.addMarker(pos);
          mapService.setCenter(pos);
          mapService.getWeather(pos);
          ev.target.location.value = "";
    })
    .catch(err => {
        console.log('err!!!', err);
    })
})

//my location
document.querySelector('.my-loc').addEventListener('click', (ev)=>{
    locService.getPosition()
    .then(pos => {
        var loc = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          mapService.addMarker(loc);
          mapService.setCenter(loc);
          mapService.getWeather(loc);
    })
    .catch(err => {
        console.log('err!!!', err);
    })
})

// copy url to clipboard and save current map postion
document.querySelector('.copy-loc').addEventListener('click', (ev)=>{
    console.log(location.href);
    mapService.copyUrl(location.href);
})

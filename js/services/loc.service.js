// ES6 Object shorthand syntax:
// var x = 9;
// var y = 8;

// var obj = {x, y};
// console.log('obj', obj);

const API_KEY = 'AIzaSyBSwBN9DWvwKbCTD8_iLPOZJwRwZGj3-aE';

var locs = [{lat: 11.22, lng: 22.11}]

function getLocs1() {
    return Promise.resolve(locs);
}

function getLocs() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(locs);
        }, 2000)
    });

}

//using setTimeout because geoloation service work slow
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            // default location
            resolve({
                coords: {
                    latitude: 32.0853,
                    longitude:  34.7818
                }
            })
        }, 1000);
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

function getCords(address){
return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBSwBN9DWvwKbCTD8_iLPOZJwRwZGj3-aE`)
.then(function (res) {
    console.log('get cords',res.data);
   return res.data.results[0].geometry.location;
 })
}


export default {
    getLocs :getLocs,
    getPosition: getPosition,
    getCords: getCords
}
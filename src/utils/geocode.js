const request = require("request");
const geocode = (address, callback) => {
    var url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoicGFhcnRoc29pbiIsImEiOiJjazBvZzh4M3EwMWN5M2NyaHN4bmVnN3RsIn0.nZnJ-yg0oIinVtQ6pirvqw&limit=1";
    request({url, json: true}, (err, data) => {
        if(err) {
            callback("Unable to connect to location service", undefined);
        }
        else if(data.body.features.length === 0) {
            callback("Unable to find location. Try another location", undefined);
        }
        else {
            var lat=data.body.features[0].center[1];
            var lon=data.body.features[0].center[0];
            var result= {
                lat: lat,
                lon: lon,
                location: data.body.features[0].place_name
            }
            callback(undefined, result);
        }
    })
}

module.exports = geocode;
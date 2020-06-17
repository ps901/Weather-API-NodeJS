var request = require("request");
var forecast = (lat, lon, callback) => {
    const url = "https://api.darksky.net/forecast/3e88bfaace930d440453200521db4787/"+lat+","+lon+"/?units=auto";
    request({url, json: true},(err, data) => {
        if(err)
            callback(err, undefined)
        else if(data.body.error) {
            callback("Unable to find location", undefined)
        } else {
            const result = {
                summary: data.body.daily.data[0].summary+" It is "+data.body.currently.temperature+" degrees outside with "+data.body.currently.precipProbability+"% probability of rain",
                humidity: data.body.daily.data[0].humidity,
                minTemp: data.body.daily.data[0].temperatureMin,
                maxTemp: data.body.daily.data[0].temperatureMax
            }
            callback(undefined, result);
        }
    })
}

module.exports = forecast;
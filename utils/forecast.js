const request = require('postman-request');

const forecast = (data, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=eb219b340d00a75dc2d54d52fa644bfe&query=" + data.lat + ',' + data.lon;

    request({
        url: url,
        json: true
    }, (err, res) => {
        if (err) {
            callback('Unable to location service!', undefined)
        } else if (res.body.length == 0) {
            callback('Unable to find location. Please try another search!', undefined)
        } else {

            callback(undefined, res.body);
        }



    })
}

module.exports = forecast
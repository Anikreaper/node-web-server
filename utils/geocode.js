const request = require('postman-request');

const geocoding = (address, callback) => {


    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYW5pay1yZWFwZXIiLCJhIjoiY2t3dGRmMWVuMWY0NjJ2cDNoYTE5NW5tMyJ9.QX52AwpKcvVoy3EqZQzEzQ&limit=1";

    
    request({ url: url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to location service!', undefined)
        }
        else if (body.features.length == 0) {
            callback('Unable to find location. Please try another search!', undefined)
        }
        else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                place_name: body.features[0].place_name
            })
        }


    })
}

module.exports = geocoding
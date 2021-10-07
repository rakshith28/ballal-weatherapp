const request = require("request");
// const { callbackify } = require("util");
const geo = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicmFrc2hpdGgtYmFsbGFsLW0iLCJhIjoiY2t1Y2szNTZjMTE0NDJwbnpuZHZxN3B0dCJ9.e40rJEJsKJOTV-WbdhBO1Q";

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to find weathere service', undefined)
        } else if (response.body.features.length === 0) {
            callback('unable to find the location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name

            })
        }
    })

}

// geo('Kabbala,chitradurga', (e, data) => {
//     console.log('e', e)
//     console.log('e', data)

// })







const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=04641bc3ad255c4b3370b0b32636c39a&query=" + latitude + "," + longitude + '&units=s';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to find weathere service', undefined)
        } else if (response.body.error) {
            callback('unable to find the location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + " today tem is " + response.body.current.temperature + " it luks like " + response.body.current.feelslike + ".")
        }
    })

}

forecast(17.36667, 78.46667, (e, data) => {
    console.log('e', e)
    console.log('e', data)

})





































// try {

//     request({ url: url, json: true }, (error, response) => {
//         const lat = response.body.features[0].center[1]
//         const long = response.body.features[0].center[0]
//         console.log(lat)
//         console.log(long)
//     })

// } catch (error) {
//     console.error(error);

// }

// const place = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             location: 'a',
//             location2: 'b'
//         }
//         callback(data)
//     })
// }


// place('bangalore', (data) => {
//     console.log(data)
// })

// const grater = (a, b, shiva) => {


// }

// grater(5, 6, (max) => {
//     console.log(max)
// })
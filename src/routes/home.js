const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res) => {
  const query = req.query.q
  const googleApikey = 'AIzaSyD6rKc6URJVJv5GNgNydJxd19jitau6pg0'
  const googleGeocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${googleApikey}`
  request(googleGeocodingUrl, async (error, response, body) => {
      try {
        const geometry = JSON.parse(body).results[0].geometry.location
        if (!error && response.statusCode === 200 && geometry) {
          const coordinates = {
            latitude: Number(geometry.lat.toFixed(3)),
            longitude: Number(geometry.lng.toFixed(3))
          }
          await weatherApiRequest(coordinates, res)
        } else {
          res.json(error);
        }
      } catch (error) {
        res.json(error);
      }
    }
  );
  // res.render('home')
});


router.get('/weather', (req, res) => {
  let a = '';
  request('https://api.openweathermap.org/data/2.5/forecast?lat=-27.5948698&lon=-48.54821949999999&units=metric&appid=b78eb13035123aa706e7715ef9d79f6c',
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log(JSON.parse(body).cnt);
        a = JSON.parse(body).cnt
        // res.json(body);
        res.render('hi', {
          name: a || 'Jhonatan Tomimatsu'
        })
      } else {
        // res.json(error);
      }
    }
  );
  // res.render('hi', {
  //     name: a || 'Jhonatan Tomimatsu'
  // })
});

const formaAmPm = (time) => {
  return Number(time) > 12 ? time % 12 + ' pm' : time + ' am' 
};

const parseWeatherData = (data) => {
  const weatherTimeList = Array.isArray(data.list) ? data.list.splice(0, 5) : []
  return {
    cityName: data.city.name,
    weatherList: weatherTimeList.map((item) => {
      
      return {
        temperature: parseInt(item.main.temp),
        feelsLike: item.main.feels_like,
        minimum: item.main.temp_min,
        maximum: item.main.temp_max,
        humidity: item.main.humidity,
        weather: item.weather[0].main,
        weatherDescription: item.weather[0].description,
        icon: item.weather[0].icon,
        unixTime: formaAmPm(('0' + new Date(item.dt * 1000).getHours()).slice(-2))
      }
    })    
  };
  // return data
};

const weatherApiRequest = ({ latitude, longitude }, res) => {
  const openWeatherApikey = 'b78eb13035123aa706e7715ef9d79f6c'
  const googleGeocodingUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherApikey}`
  
  request(googleGeocodingUrl, async (error, response, body) => {
    try {
      const data = JSON.parse(body);
      if (!error && response.statusCode === 200) {
        res.render('home', await parseWeatherData(data))
        
        // res.json(await parseWeatherData(data));
      } else {
        res.json(error);
      }
    } catch (error) {
      res.json(error);
    }
  });
};

router.get('/search', (req, res) => {
  const query = req.query.q
  const googleApikey = 'AIzaSyD6rKc6URJVJv5GNgNydJxd19jitau6pg0'
  const googleGeocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${googleApikey}`
  request(googleGeocodingUrl, async (error, response, body) => {
      try {
        const geometry = JSON.parse(body).results[0].geometry.location
        if (!error && response.statusCode === 200 && geometry) {
          const coordinates = {
            latitude: Number(geometry.lat.toFixed(3)),
            longitude: Number(geometry.lng.toFixed(3))
          }
          await weatherApiRequest(coordinates, res)
        } else {
          res.json(error);
        }
      } catch (error) {
        res.json(error);
      }
    }
  );
  // res.render('hi', {
  //     name: a || 'Jhonatan Tomimatsu'
  // })
});

module.exports = router;
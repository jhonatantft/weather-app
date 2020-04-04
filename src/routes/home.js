const express = require('express');
const request = require('request');
const router = express.Router();

/**
 * @summary Cache data store
 *
 * @classdesc Stores weather data from openWeather API
 * according with current coordinates being requested
 * @hideconstructor
 */
class WeatherCache {
  /**
   * Cached dict
   */
  constructor () {
    this.cachedData = {}
  }
  /**
   * Retrieve memory cache
   */
  get cache () {
    return this.cachedData;
  }

  /**
   * @description returns boolean to invalidate current cache data
   *
   * @param {Date} date - time that data was created
   * @returns {Boolean}
   */
  shouldInvalidateCache (date) {
    const hour = 1000 * 120 * 60;
    const twoHoursAgo = new Date(Date.now() - hour)
    return date < twoHoursAgo;
  }
}
const cachedWeatherData = new WeatherCache();

/**
 * Returns american time notation
 *
 * @param {String} hours - 
 * @returns {String}
 */
const formatAmPm = (hours) => {
  return Number(hours) > 12 ? hours % 12 + ' pm' : hours + ' am' ;
};

/**
 * Reduce and parses those externals apis to only the
 * necessary data to be rendered in the client side
 *
 * @param {Object} data - response from openWeatherUrl
 * @param {String} cityName - name from googleGeocodingUrl's response
 * @param {Array} currentWeather - current weather description
 * @param {Object} main - current weather temperatures
 * @returns {Object}
 */
const parseWeatherData = (data, cityName, currentWeather, main) => {
  const weatherTimeList = Array.isArray(data.list) ? data.list.splice(0, 5) : [];
  return {
    currentWeather: ((currentWeather || [])[0] || {}).description,
    currentTemperature: parseInt(main.temp - 273.15),
    currentWeatherIcon: ((currentWeather || [])[0] || {}).icon,
    cityName: cityName,
    location: ((data || {}).city || {}).name,
    weatherList: weatherTimeList.map((item) => {
      const main = item.main || {};
      const weather = (item.weather && item.weather[0]) || [];
      return {
        temperature: parseInt(main.temp),
        feelsLike: main.feels_like,
        minimum: main.temp_min,
        maximum: main.temp_max,
        humidity: main.humidity,
        weather: weather.main,
        weatherDescription: weather.description,
        icon: weather.icon,
        unixTime: formatAmPm(('0' + new Date(item.dt * 1000).getHours()).slice(-2))
      };
    })
  };
};

/**
 * Retrieves current and forecast weather data
 *
 * @param {Object} coordinates - coordinates values
 * @param {Number} coordinates.latitude - latitude value
 * @param {Number} coordinates.longitude - longitude value
 * @param {String} coordinates.cityName - cityName value
 * @param {Object} res - `googleDataFetcher` response
 * @returns {Object}
 */
const weatherApiDataFetcher = ({ latitude, longitude, cityName }, res) => {
  const openWeatherApikey = 'b78eb13035123aa706e7715ef9d79f6c';
  const openWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherApikey}`;
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherApikey}`;
  const currentDataOnMemoryCache = cachedWeatherData.cache[`${latitude}-${longitude}`];
  const lastDataTimeRequested = (currentDataOnMemoryCache || {}).createdAt; 

  if (currentDataOnMemoryCache && !cachedWeatherData.shouldInvalidateCache(lastDataTimeRequested)) {
    res.render('home', currentDataOnMemoryCache);
  } else {
    request(currentWeatherUrl, async (error, response, body) => {
      try {
        const { weather, main } = JSON.parse(body);
        if (!error && response.statusCode === 200) {
          request(openWeatherUrl, async (error, response, body) => {
            try {
              const data = JSON.parse(body);
              if (!error && response.statusCode === 200) {
                const normalizedData = await parseWeatherData(data, cityName, weather, main);
                normalizedData.createdAt = new Date();
                cachedWeatherData.cache[`${latitude}-${longitude}`] = normalizedData;

                res.render('home', normalizedData);
              } else {
                res.json(error);
              }
            } catch (error) {
              res.json(error);
            }
          });
  
        } else {
          res.json(error);
        }
      } catch (error) {
        res.json(error);
      }
    });
  }
};

/**
 * Retrieves geocoding data
 *
 * @param {Object} req 
 * @param {Object} res 
 */
const googleDataFetcher = (req, res) => {
  const query = req.query.q || 'florianopolis'
  const googleApikey = 'AIzaSyD6rKc6URJVJv5GNgNydJxd19jitau6pg0'
  const googleGeocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${googleApikey}`

  request(googleGeocodingUrl, async (error, response, body) => {
      try {
        const results = JSON.parse(body).results[0];
        const geometry = results.geometry.location
        const address = results.address_components[0]
        if (!error && response.statusCode === 200 && geometry) {
          const coordinates = {
            latitude: Number(geometry.lat.toFixed(3)),
            longitude: Number(geometry.lng.toFixed(3)),
            cityName: address.long_name
          }
          await weatherApiDataFetcher(coordinates, res)
        } else {
          res.json(error);
        }
      } catch (error) {
        res.json(error);
      }
    }
  );
};

router.get('/', googleDataFetcher);

router.get('/search', googleDataFetcher);

module.exports = router;
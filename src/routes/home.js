const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home')
});


router.get('/test', (req, res) => {
    let a = '';
    request('https://api.openweathermap.org/data/2.5/forecast?lat=-27.5948698&lon=-48.54821949999999&units=metric&appid=b78eb13035123aa706e7715ef9d79f6c',
        function (error, response, body) {
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

router.get('/google', (req, res) => {
    let a = '';
    request('https://maps.googleapis.com/maps/api/geocode/json?address=florianopolis&key=AIzaSyD6rKc6URJVJv5GNgNydJxd19jitau6pg0',
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body).results[0].formatted_address);
            a = JSON.parse(body).results[0].formatted_address
            res.json(JSON.parse(body));
            // res.render('hi', {
            //     name: a || 'Jhonatan Tomimatsu'
            // })
          } else {
            // res.json(error);
          }
        }
    );
    // res.render('hi', {
    //     name: a || 'Jhonatan Tomimatsu'
    // })
});

module.exports = router;
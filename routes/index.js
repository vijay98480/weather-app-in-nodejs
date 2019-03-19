var express = require('express');
var router = express.Router();


let url    = 'http://api.openweathermap.org/data/2.5/weather?q='
let appId  = 'appid=e9c5bf834390e3e42fdafb6b30b53ab5';
let units  = '&units=metric';

var request = require('request');


router.post('/webhook', function(req, res) {
    console.log('record post');
    if(!req.body) return res.sendStatus(400)
    res.setHeader('Content-Type', 'application/json');
    var city = req.body.queryResult.parameter['geo-city'];
    var w = getWeather(city);
    let response="";
    let responseObj={
        "fulfillmentText": response,
        "fulfillmentMessages":[{"text": {"text": [w]}}],
        "source":""
    }
    return res.json(responseObj);

});
var result;

var apikey = 'e9c5bf834390e3e42fdafb6b30b53ab5';

function cb(err, response, body){
    if(err){
        console.log('error:', error);
    }
    var weather = Json.parse(body);
    if(weather.message --- 'city not found'){

        result = ' '+Weather.message;
    }else
    {
        result = 'Right now it is' + weather.main.temp+ 'degrees with' + weather.weather[0].description;
    }

}

function getWeather(city){
    result = undefined;
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}';
    var req = request(url, cb);
    while(result == undefined) {
        require('deasync').runLoopOnce();
    }
    return result;
}

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', {'body':'', forecast: ''});
});

router.post('/weather', function(req, res, next){
  let city = req.body.city;
  url = url+city+"&"+appId;

 request(url, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      body = JSON.parse(body);
      console.log( body);
      if(error && response.statusCode != 200){
        throw error;
      }

    let country = (body.sys.country) ? body.sys.country : '' ;
    let forecast = "For city "+city+', country '+country;

    res.render('index', {body : body, forecast: forecast});
   });
});
module.exports = router;
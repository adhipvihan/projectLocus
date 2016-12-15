// Dependencies
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var HashMap = require('hashmap');
var Yelp = require('yelp');
var foursquare = (require('foursquarevenues'))('NEGODYGBDEUJP4CZXLIH3NMJXPXDLBNBLHYM0DEI1HUHEBQA', 'XPVLEINXK0ZO333OJBEUOJDRXV4K24BTUJB5DNZ0D2B03EDV');

// Models
var Location = require('../models/location');

//Routes
router.get('/city/:locPrefix', function(req, res, next) {
    var prefix = req.params.locPrefix;
    locationPref = new RegExp("^" + prefix, "i");

    var map = new HashMap();
    Location.find({cityKey: locationPref}, function(err, result) {
        if(err) {
            res.send("Something went wrong!" + err);
        } else {
            filteredResult = [];
            console.log("Resulttt");
            for(var i = 0; i < result.length; i++) {
                var cityKey = result[i].cityKey;
                if(map.get(cityKey) == undefined) {
                    filteredResult.push(result[i]);
                    map.set(cityKey, result[i])
                }
            }
            res.json(filteredResult);
        }
    });
})

router.get('/validate', function(req, res, next) {
    var cityName = req.query.cityName;
    console.log("Cityname for validation : " + cityName);
    var map = new HashMap();
    Location.find({cityKey: cityName}, function(err, result) {
        if(err) {
            res.send("Something went wrong!" + err);
        } else {
            filteredResult = [];
            for(var i = 0; i < result.length; i++) {
                var cityKey = result[i].cityKey;
                if(map.get(cityKey) == undefined) {
                    filteredResult.push(result[i]);
                    map.set(cityKey, result[i])
                }
            }
            res.json(filteredResult);
        }
    });
})


router.get('/validate/zipcode', function(req, res, next) {
    var zipcode = req.query.zipcode;
    console.log("Zipcode for validation : " + zipcode);
    var map = new HashMap();
    Location.find({zipCode: zipcode}, function(err, result) {
        if(err) {
            res.send("Something went wrong!" + err);
        } else {
            filteredResult = [];
            for(var i = 0; i < result.length; i++) {
                var zipCode = result[i].zipCode;
                if(map.get(zipCode) == undefined) {
                    filteredResult.push(result[i]);
                    map.set(zipCode, result[i])
                }
            }
            res.json(filteredResult);
        }
    });
})

router.get('/zipcode/:zipPrefix', function(req, res, next) {
    var prefix = req.params.zipPrefix;
    zipPref = new RegExp("^" + prefix, "i");
    //console.log("Regular expression is: " + zipPref);

    Location.find({zipCode: zipPref}, function(err, result) {
        if(err) {
            res.send("Something went wrong!" + err);
        } else {
            res.json(result);
        }
    });
})


// Yelp APIs
var yelp = new Yelp({
  consumer_key: '0cEfTVRANgnAW6uqbbsK_w',
  consumer_secret: '0UzVMFLmgYNoy0l7u78d_Jzmvks',
  token: 'NScOaFSuZZ7FKb-XYonx-pfPsDZGb9ZJ',
  token_secret: 'tzizX4PQr6DfGC0JQwCJpQwdviM'
});



router.get('/yelp', function(req, res, next) {
    console.log("Hitting yelp");
    var cityName = req.query.cityName;
    var latLong = req.query.latLong;

    yelp.search({ term: 'restaurants', location: cityName, cll: latLong, sort: '2', radius_filter: '20000' })
    .then(function (data) {
            res.json(data);
        })
    .catch(function (err) {
            res.json(err);
        });
})

// Foursquare APIs
router.get('/foursquare/getVenues', function(req, res, next) {
    
    var latLong = req.query.latLong;

    console.log("Hitting foursquare for lat long: "+ latLong);
    var params = {
        "ll": latLong
    };
    foursquare.getVenues(params, function(error, venues) {
        if (!error) {
            res.json(venues);
        } else {
            console.log(error);
        }
    });

})


router.get('/foursquare/exploreVenues', function(req, res, next) {
    
    var latLong = req.query.latLong;

    console.log("Hitting foursquare for lat long: "+ latLong);
    var params = {
        "ll": latLong
    };
    foursquare.exploreVenues(params, function(error, venues) {
        if (!error) {
            res.json(venues);
        } else {
            console.log(error);
        }
    });

})

// Eventful APIs
var eventful = require('eventful-node');
var client = new eventful.Client('DHcfQdPRdK3H43Kt');

router.get('/events/findEvents', function(req, res, next) {
    
    var zipCode = req.query.zipCode;

    console.log("Hitting Eventful api for zipcode: " + zipCode);
    var params = {
        location: zipCode,
        sort_order: "popularity"
    };
    client.searchEvents(params, function(err, data){
 
        if(err){    
            console.log(err);
        } else {
            res.json(data);
        }        
        // console.log('Recieved ' + data.search.total_items + ' events');
        
        // console.log('Event listings: ');
        
        // //print the title of each event 
        // for(var i in data.search.events){
        
        //     console.log(data.search.events[i].title);
        
        // }
        
    });
})





// Return router
module.exports = router;



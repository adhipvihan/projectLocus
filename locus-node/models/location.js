// Dependencies
var restful = require('node-restful');
var mongoose = require('mongoose');

// Schema
var locationSchema = new mongoose.Schema({
    cityName: String,
    lattitude: String,
    longitude: String,
    stateCode: String,
    stateName: String,
    zipCode: String,
    cityKey: String
});

//  Return Model
module.exports = restful.model("Location", locationSchema);
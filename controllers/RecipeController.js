/**
 * Default REST contoller for your db.
 *
 * Usage:
 *	(1) Change the modelLocation variable to the location where your corresponding model
 *		is stored.
 *
 *	(2 - optional) Add custom routing for your API. NOTE: If you don't know what this means,
 *				   you don't need it.
 */

var modelLocation = '../models/Recipe'

 /****************************************************************
 *				   DO NOT TOUCH BELOW THIS LINE 				 *
 ****************************************************************/

var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');

/**  Model and route setup **/

var model = require(modelLocation).model;
const route = require(modelLocation).route;
const routeIdentifier = util.format('/%s', route);

/** Express setup **/

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))

/** Express routing **/

/*
 * Middleware to log requests.
 *
 */

app.all(routeIdentifier+'/', function (req, res, next) {
	console.log("METHOD: "+req.method+" /"+route);
	next();
})

/* 
 * GET /clean
 *
 */

app.get(routeIdentifier+'/clean', function (req, res) {
	model.remove().exec();
	res.send("API Cleaned.");
});

/* 
 * GET / 
 *
 */
 app.get(routeIdentifier+'/', function(req, res, next) {
 	model.find(function (err, objects) {
 		if (err) return next(err);
 		res.json(objects);
 	});
 });

/* 
 * POST / 
 *
 */
 app.post(routeIdentifier+'/', function(req, res, next) {
 	model.create(req.body, function (err, entry) {
 		if (err) return next(err);
 		res.json(entry);
 	});
 });

/* 
 * GET /:id
 *
 */
 app.get(routeIdentifier+'/:id', function (req, res, next) {

 	console.info("Looking for ID: "+req.params.id)
 	model.findById(req.params.id, function (err, entry){
 		if(err) res.send(err);
 		res.json(entry);
 	});
 });

/* 
 * PUT /:id
 *
 */
 app.put(routeIdentifier+'/:id', function(req, res, next) {
 	model.findByIdAndUpdate(req.params.id, req.body, function (err, entry) {
 		if (err) return next(err);
 		res.json(entry);
 	});
 });

/* 
 * DELETE /:id
 *
 */
app.delete(routeIdentifier+'/:id', function (req, res, next) {
  model.findByIdAndRemove(req.params.id, req.body, function (err, entry) {
    if (err) return next(err);
    res.json(entry);
  });
});

 module.exports = app;
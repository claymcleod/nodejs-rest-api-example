/**
 * UserController.js
 *
 * Unless you are trying to implement some custom functionality, you shouldn't
 * need to edit this file.
 */

var modelLocation = '../models/User'

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
});

/* 
 * GET / 
 *
 */
 
 app.get(routeIdentifier+'/', function(req, res, next) {
 	model.find(function (err, objects) {
 		if (err) return res.send(err);
 		res.json(objects);
 	});
 });

/* 
 * POST / 
 *
 */

 app.post(routeIdentifier+'/', function(req, res, next) {
 	model.create(req.body, function (err, entry) {
 		if (err) return res.send(err);
 		res.json(entry);
 	});
 });

 module.exports = app;
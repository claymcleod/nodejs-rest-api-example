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
var authController = require('./AuthController');

/**  Model and route setup **/

var model = require(modelLocation).model;
var userModel = require('../models/User').model;

const route = require(modelLocation).route;
const routeIdentifier = util.format('/%s', route);

/** Express setup **/

var router = express.Router();

/** Express routing **/

/*
 * Check to make sure user option is valid. This prevents user spoofing
 * and cements and invalid login attempts.
 *
 */

 router.use('*', function (req, res, next) {
 	if (!req.user) res.send('Unauthorized');
 	if (userModel.findOne({'_id': req.user._id}, function (err, res) {
 		if (err) res.send('Unauthorized');
 		next();
 	}));
 });

/* 
 * GET / 
 *
 */

 router.get(routeIdentifier+'/', function(req, res, next) {
 	model.find({'owner':req.user._id}, function (err, objects) {
 		if (err) return res.send(err);
 		res.json(objects);
 	});
 });

/* 
 * POST / 
 *
 */

 router.post(routeIdentifier+'/', function(req, res, next) {
 	req.body.owner = req.user._id;
 	model.create(req.body, function (err, entry) {
 		if (err) return next(err);
 		res.json(entry);
 	});
 });

/* 
 * GET /:id
 *
 */

 router.get(routeIdentifier+'/:id', function (req, res, next) {
 	console.info("Looking for ID: "+req.params.id)
 	model.findOne({'_id':req.params.id, 'owner':req.user._id}, function (err, entry){
 		if(err) res.send(err);
 		res.json(entry);
 	});
 });

/* 
 * PUT /:id
 *
 */

 router.put(routeIdentifier+'/:id', function(req, res, next) {
 	model.findOneAndUpdate({'_id':req.params.id, 'owner':req.user._id}, req.body, function (err, entry) {
 		if (err) return res.send(err);
 		res.json(entry);
 	});
 });

/* 
 * DELETE /:id
 *
 */
 
router.delete(routeIdentifier+'/:id', function (req, res, next) {
  model.findOneAndRemove({'_id':req.params.id, 'owner':req.user._id}, req.body, function (err, entry) {
    if (err) return res.send(err);
    res.json(entry);
  });
});

 module.exports = router;
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
 	if (!req.user) {
        return res.status(403).send('403 - Forbidden');
    }

 	if (userModel.findOne({'_id': req.user._id}, function (err, res) {
 		if (err) {
            return res.send(err);
        }

 		next();
 	}));
 });

/*
 * GET /list
 *
 */

 router.get(routeIdentifier+'/list', function(req, res, next) {
 	model.find({'owner':req.user._id}, function (err, objects) {
 		if (err) return res.send(err);
 		return res.json(objects);
 	});
 });

/*
 * GET /create
 *
 */

 router.get(routeIdentifier+'/create', function(req, res, next) {
 	req.body.owner = req.user._id;
 	model.create(req.query, function (err, entry) {
 		if (err) return next(err);
 		return res.json({
            status: 'Success',
            message: 'Item created!'
        });
 	});
 });

/*
 * GET /get/:id
 *
 */

 router.get(routeIdentifier+'/get/:id', function (req, res, next) {
 	model.findOne({
        '_id':req.params.id,
        'owner':req.user._id
    }, function (err, entry){
 		if(err) return res.send(err);
 		return res.json(entry);
 	});
 });

/*
 * GET /update/:id
 *
 */

 router.get(routeIdentifier+'/update/:id', function(req, res, next) {
 	model.findOneAndUpdate({
        '_id':req.params.id,
        'owner':req.user._id
    },
    req.query,
    function (err, entry) {
 		if (err) return res.send(err);
 		return res.json({status: 'Success', message: 'Updated item'});
 	});
 });

/*
 * GET /delete/:id
 *
 */

router.get(routeIdentifier+'/delete/:id', function (req, res, next) {
  model.findOneAndRemove({
        '_id':req.params.id,
        'owner':req.user._id
    },
    req.body,
    function (err, entry) {
        if (err) return res.send(err);
        return res.json({status: 'Success', message: 'Deleted item'});
    });
});

 module.exports = router;

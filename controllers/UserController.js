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

 /** Router setup **/

 var router = express.Router();

 /** Express routing **/

/* 
 * POST / 
 *
 */

 router.post(routeIdentifier+'/', function(req, res, next) {
 	model.create(req.body, function (err, entry) {
 		if (err) return res.send(err);
 		res.json(entry);
 	});
 });


 module.exports = router;
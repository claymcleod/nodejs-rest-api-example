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

 /**  Model and route setup **/

 var model = require(modelLocation).model;
 const route = require(modelLocation).route;
 const routeIdentifier = util.format('/%s', route);

 /** Router setup **/

 var router = express.Router();

 /** Express routing **/

/*
 * GET /create
 *
 */

 router.get(routeIdentifier+'/create', function(req, res, next) {
    if (req.query === undefined || req.query.username === undefined || req.query.password === undefined) {
        return res.json({
            status: 'Failure',
            message: 'Both username and password must be defined in the query string!'
        });
    }

    if (req.query.username === "") {
        return res.json({
            status: 'Failure',
            message: 'Username cannot be empty!'
        });
    }

    if (req.query.password === "") {
        return res.json({
            status: 'Failure',
            message: 'Password cannot be empty!'
        });
    }

 	model.create(req.query, function (err, entry) {
 		if (err) return res.send(err);

        return res.json({
            status: 'Success',
            message: 'User was created!'
        });
 	});
 });


 module.exports = router;

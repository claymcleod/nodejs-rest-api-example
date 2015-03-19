/**
 * AuthController.js
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
 var passport = require('passport');
 var config = require('../private/config');

 /**  Model and route setup **/

 var User = require(modelLocation).model;

 /****************************************************************
 *				   			Basic Strategy 		         		 *
 ****************************************************************/

 var BasicStrategy = require('passport-http').BasicStrategy;

 passport.use(new BasicStrategy(
 	function (username, password, cb) {
 		User.findOne({username: username}, function (err, user){
 			if (err) return cb(err);
 			if (!user) return cb(null, null);

 			user.authenticate(password, function(err, authenticated){
 				if (err) return cb(err);
 				if (!authenticated) return cb(err, false);
 				return cb(null, user);
 			});
 		});
 	}
 	));

 passport.serializeUser(function(user, done) {
 	done(null, user);
 });

 passport.deserializeUser(function(user, done) {
 	User.findById(user.id, function (err, user) {
 		done(err, user);
 	});
 });

 exports.authenticated = passport.authenticate('basic', {session: true});
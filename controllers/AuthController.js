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
var bodyParser = require('body-parser');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

/**  Model and route setup **/

var User = require(modelLocation).model;

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
  done(null, user);
});

exports.authenticated = passport.authenticate('basic', {session: true});
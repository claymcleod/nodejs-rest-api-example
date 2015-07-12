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
 var router = express.Router();
 var passport = require('passport');
 var config = require('../private/config');

 /**  Model and route setup **/

 var User = require(modelLocation).model;

 /****************************************************************
 *				   			Local Strategy 		         		 *
 ****************************************************************/

var LocalStrategy = require('passport-local').Strategy;

passport.use('local', new LocalStrategy({
        passReqToCallback: true
    },
    function(req, username, password, done) {
        var caseInsensitiveRegex = new RegExp('^' + username + '$', "i");
        User.findOne({
                'username': caseInsensitiveRegex
            },
            function(err, user) {
                if (err) return done(err);
                if (!user) return done(null, false, req.flash('error', 'User Not found.'));

                user.authenticate(password, function(res) {
                    if (res === false)
                        return done(null, false, req.flash('error', 'Invalid Password'));

                    req.logIn(user, function(err) {
                        if (err) return next(err);
                        return done(null, user);
                    });
                });
            });

    }));

 passport.serializeUser(function(user, done) {
    done(null, user);
 });

passport.deserializeUser(function(user, done) {
    User.findById(user._id, function (err, user) {
        done(err, user);
    });
 });

module.exports.isAuthenticated = function (req, res, next) {
    if (!req.user) return res.status(403).send('Unauthorized');
    if (User.findOne({'_id': req.user._id}, function (err, res) {
        if (err) return res.status(403).send('Unauthorized');
        next();
    }));
}

/****************************************************************
 *                          Login methods                       *
 ****************************************************************/

 router.post('/login', passport.authenticate('local'), function(req, res) {
    console.log('User: ',req.user.username);
    return res.json({status: 'Success', message: 'Logged in!'})
  });

 module.exports.router = router;

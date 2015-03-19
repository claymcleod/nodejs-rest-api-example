/**
 * app.js
 *
 * Main execution file for this project.
 */

 /** External modules **/
 var express = require('express');
 var mongoose = require('mongoose');
 var bodyParser = require('body-parser');
 var session = require('express-session');
 var cookieParser = require('cookie-parser');
 var passport = require('passport');

 /** Internal modules **/
 var config = require('./private/config');
 var authController = require('./controllers/AuthController');
 var userController = require('./controllers/UserController');
 var recipeController = require('./controllers/RecipeController');

 /** Database setup **/
 mongoose.connect(config.DB_PATH);

 /** Express setup **/
 var app = express();

 app.set('json spaces',4);

 app.use(cookieParser());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(session(
 { 
 	secret: config.SESSION_SECRET, 
 	cookie: 
 	{
 		maxAge: 10000
 	}, 
 	resave: false,
 	saveUninitialized: false
 }
 ));
 app.use(passport.initialize());
 app.use(passport.session());

 /** Express routing **/

app.use('*', function (req, res, next) {
 	console.log("METHOD: "+req.method+" "+req.originalUrl);
 	next();
 });

 app.use('/', userController);
 app.use('/api', authController.authenticated, recipeController);

 /** Server deployment **/
 var port = config.PORT || 3000;
 app.listen(port)

 console.log("Session secret: "+config.SESSION_SECRET);
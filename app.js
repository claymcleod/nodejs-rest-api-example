/**
 * app.js
 *
 * Main execution file for this project.
 */

/** External modules **/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

/** Internal modules **/
var dbconfig = require('./private/dbconfig');
var authController = require('./controllers/AuthController')
var userController = require('./controllers/UserController');
var recipeController = require('./controllers/RecipeController');

/** Database setup **/
mongoose.connect(dbconfig.DB_PATH)

/** Express setup **/
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set('json spaces', 4);
app.use(bodyParser.urlencoded({ extended: false }))

/** Express routing **/

app.use('/', userController);
app.use('/api', authController.authenticated, recipeController);

/** Server deployment **/
var port = process.env.PORT || 3000;
app.listen(port)
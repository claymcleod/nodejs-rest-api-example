/** External modules **/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

/** Internal modules **/
var dbconfig = require('./private/dbconfig');
var recipeController = require('./controllers/RecipeController');

/** Database setup **/
mongoose.connect(dbconfig.DB_PATH)

/** Express setup and routing **/
var app = express();
app.set('json spaces', 4);
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', recipeController);

/** Server deployment **/
var port = process.env.PORT || 3000;
app.listen(port)
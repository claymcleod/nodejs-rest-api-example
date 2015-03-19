A skeleton of a secure RESTFUL api for NodeJS.

# Steps to add new API

* Copy the template model (models/Recipe.js) to a new file in the /models folder and make the modifications outlined in the header.
* Copy the template controller (controllers/RecipeController.js) to a new file in the /controllers folder and make the modifications outlined in the header.
* Import your controller in app.js underneath the existing controllers, like so:
```
var recipeController = require('./controllers/RecipeController');
var customController = require('./controllers/CustomController');
```
* Add the routing line to app.js underneath the existing routes, like so: 
``` 
app.use('/api', recipeController);
app.use('/api', customController);
```
[![Codeship Status](https://codeship.com/projects/8e512810-b025-0132-3257-0e5ba92aabbb/status?branch=master)](https://codeship.com/projects/69472)

# NodeJS secure RESTFUL api

A minimal, secure RESTFUL api for NodeJS. This project includes user login, access control of objects, and encrypted hashing of passwords right out of the box! Just delete the example models, add your own, and run!

# Installation

* Clone the repo by using ```git clone```.
* Run ```npm install``` on the cloned directory.
* Edit the private/config.js file to suit your needs.
* Add APIs using the instructions below to suit your needs.

# Steps to add new API

* Copy the template model (models/Recipe.js) to a new file in the **models** folder and make the modifications outlined in the header.

```copy models/Recipe.js --> models/Custom.js```

* Copy the template controller (controllers/RecipeController.js) to a new file in the **controllers** folder and make the modifications outlined in the header.

```copy controllers/RecipeController.js --> controllers/CustomController.js```

* Import your controller in app.js underneath the existing controllers, like so:

```
var recipeController = require('./controllers/RecipeController');
var customController = require('./controllers/CustomController');
```

* Add the routing line to app.js underneath the existing routes, like so: 

``` 
app.use('/api', authController.authenticated, recipeController);
app.use('/api', authController.authenticated, customController);
```

# Running the software

* ```node app.js``` for simple setups.
* I would recommend looking at [the pm2 module](https://www.npmjs.com/package/pm2) for running on a production server.

# Creating users

To create users, simply send a POST to /user with the required fields, like so:

```curl --data "username=claymcleod&password=helloworld&email=bla@aol.com" localhost:3000/user```

# Retrieving recipes

Similarly, we can retrieve recipes using cURL:

```curl -u claymcleod:helloworld localhost:3000/api/recipe```

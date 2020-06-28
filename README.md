# NodeJS secure RESTFUL api

A minimal, secure RESTFUL api for NodeJS. This project includes user login, access control of objects, and encrypted hashing of passwords right out of the box! Just delete the example model, add your own, and run!

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
app.use('/api', recipeController);
app.use('/api', customController);
```

# Running the software

* ```node app.js``` for simple setups.
* I would recommend looking at [the pm2 module](https://www.npmjs.com/package/pm2) for running on a production server.

# Creating users

To create users, simply send a POST to /user/create with a sample json, like so:

```
http://localhost:3000/user/create
```

```
{
    "username": "hello",
    "password": "world"
}
```

# API Endpoints

```
GET http://localhost:3000/api/recipe/list
GET http://localhost:3000/api/recipe/create?foo=hello&bar=world // creates object with fields foo=hello, bar=world
GET http://localhost:3000/api/recipe/get/:id // gets object with Mongo id ":id"
GET http://localhost:3000/api/update/get/:id?foo=hello&bar=world // updates object with Mongo id ":id" and fields foo=hello, bar=world
GET http://localhost:3000/api/recipe/delete/:id // deletes object with Mongo id ":id"
```

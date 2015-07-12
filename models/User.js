/**
 * Default skeleton for a model in your db.
 *
 * Usage:
 *	(1) Change the route to what route you would like to access this model at.
 *		For instance, if the route is 'recipe', then your API should be accessible
 * 		at http://localhost:3000/api/recipe.
 *
 *  (2) Change the modelId to the name of your file without the extension (.js).
 *		This name is generally capitalized.
 *
 *	(3) Edit the mongoose schema (instructions on doing so: http://mongoosejs.com/docs/guide.html)
 */

 var mongoose = require('mongoose');
 var bcrypt = require('bcrypt-nodejs');

const route = 'user'; 	// Route: 'recipe' routes to /recipe
const modelId = 'User';  	// Same name as file, no extension: Recipe'

var Schema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true
	}
});

Schema.pre('save', function (cb) {
	var currentUser = this;
	if (!currentUser.isModified('password')) return cb();

	bcrypt.genSalt(5, function (err, salt){
		if (err) return cb(err);

		bcrypt.hash(currentUser.password, salt, null, function (err, hash) {
			if (err) return cb(err);
			currentUser.password = hash;
			return cb();
		});
	});
});

Schema.methods.authenticate = function (pass, cb) {
	bcrypt.compare(pass, this.password, function (err, res){
		console.log("Login: "+res);
		if (err) return cb(err);
		cb(res);
	});
};

Schema.plugin(require('mongoose-findorcreate'));

 /****************************************************************
 *				   DO NOT TOUCH BELOW THIS LINE 				 *
 ****************************************************************/

 module.exports = {
 	model: mongoose.model(modelId, Schema),
 	route: route
 }

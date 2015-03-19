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

const route = 'recipe'; 	// Route: 'recipe' routes to /recipe
const modelId = 'Recipe';  	// Same name as file, no extension: Recipe'

var Schema = new mongoose.Schema({

	/** Make your edits here **/
	
	name: {type: String, required: true},
	author: String,
	type: String,
	feeds: Number,
	updated_at: { type: Date, default: Date.now },

	/** Must keep the owner property **/

	owner: {
		type: String,
		required: true
	}
});

 /****************************************************************
 *				   DO NOT TOUCH BELOW THIS LINE 				 *
 ****************************************************************/

module.exports = {
	model: mongoose.model(modelId, Schema),
	route: route
} 
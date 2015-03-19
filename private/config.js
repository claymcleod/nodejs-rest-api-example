/**
 * config.js
 *
 * Edit each of these configuration settings as you like.
 */

module.exports = {
	/** Recommended customization **/

	DB_PATH: 'mongodb://localhost:27017/mydatabase',
	PORT: 3000,

	/** Recommend that you leave these configuration settings **/

	SESSION_SECRET: require('crypto').randomBytes(64).toString('hex')
}
/**
 * config.js
 *
 * Edit each of these configuration settings as you like.
 */

var crypto = require('crypto');

module.exports = {
	/** Recommended customization **/

	DB_PATH: 'mongodb://localhost:27017/mydatabase',
	PORT: 3000,

	/** Recommend that you leave these configuration settings **/

	SESSION_SECRET_KEYS: [
        crypto.randomBytes(32).toString('hex'), crypto.randomBytes(32).toString('hex'),
        crypto.randomBytes(32).toString('hex'), crypto.randomBytes(32).toString('hex')
    ],
}

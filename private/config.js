module.exports = {
	DB_PATH: 'mongodb://localhost:27017/mydatabase',
	SESSION_SECRET: require('crypto').randomBytes(64).toString('hex'),
	PORT: 3000
}
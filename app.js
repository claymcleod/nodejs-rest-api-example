var express = require('express');
var dbconfig = require('./private/dbconfig');

var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

app.get('/', function (req, res){
	res.send(dbconfig.DB_PATH);
});

app.listen(port)
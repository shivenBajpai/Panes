//packages
var express = require('express');
var bp = require('body-parser');
const cookieParser = require("cookie-parser")
var routing = require('./Controllers/Routing.js');
var auth = require('./Controllers/Auth.js');
var fs = require('fs');
const pane_data_path = "\\Model\\panes.json";

//Initialize Express
var app = express();
var port = 8080;

//Configure Express
app.set('view engine', 'ejs' )
app.use(bp.urlencoded({ extended: true }));
app.use(cookieParser());
console.log("OK:Config Complete!");

//Routing
fs.readFile(__dirname + pane_data_path,(err,data) => {
	if (err) throw err;
	routing(JSON.parse(data),app, __dirname);
	})
console.log("OK:Routing Online!");

//Authentication
auth(fs,app,__dirname + "\\Model\\auth.json");
console.log("OK:Authentication Online!");

//Configuring Static Files
app.use(express.static('public'))

//Opening Server
app.listen(port, function(){
	console.log('OK: Listening to port' + port +"\n");

});

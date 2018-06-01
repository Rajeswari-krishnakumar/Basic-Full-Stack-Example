const http = require("http");
const url = require("url");
const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

function start(){
	let app = express();
	let MongoClient = require('mongodb').MongoClient;
	let url = 'mongodb://localhost:27017/';
	let rootDirectory =  path.normalize(__dirname + '/..');
	app.set('appPath', path.join(rootDirectory, 'build'));
	app.use(express.static(path.join(rootDirectory, 'build')));
	// Following line to get post body
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.get('/', (req, res) =>{
		res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
	});

	app.post('/login', (req, res) => {
		let userName=req.body.userName;
		let password=req.body.password;
		MongoClient.connect(url, function(err, db) {
			if(err){
				console.log("err", err);
			}
			var dbo = db.db("EmployeeDB");
			dbo.collection("EmployeeDetails").findOne({"name":userName,"password":password}, 
				function(err, result) {
				    if (err) throw err;
				    if(result && result.name === userName){
				    	res.send({"message":"Success!!!"});
				    }else{
				    	res.send({"message":"Username or password is wrong"});
				    }
				    db.close();
				});
	   	});
	});
	app.listen(8080,function(){
		console.log("Server started and listening on 8080");
	});
}
// module.exports = app;
exports.start = start;

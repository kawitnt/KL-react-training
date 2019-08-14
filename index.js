const express = require('express');
const session = require('express-session');
const path = require('path');
var http = require('http')
var port = 8080;
var mysql = require('mysql');
var bodyParser = require('body-parser');
var StringDecoder = require('string_decoder').StringDecoder;

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({cookie: { secure: false },secret:'eiei', saveUninitialized : true, resave : true}));

app.all('/*', function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type, Access-Control-Allow-Origin, Access-Control-Allow-Headers");
	//res.setHeader("Access-Control-Allow-Methods", "GET, POST","PUT");
	next();
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/sql', function (req, res) {
	let con = mysql.createConnection({
		host: "localhost",
		user: "root",
		database: 'test'
	});
	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
	});
	let sql = "SELECT * FROM test_data";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log(result);
		res.send(result);
	});
	con.end();
})

app.post('/sqlpost', function (req, res) {
	console.log(req.body);
	res.send(req.body);
})

app.post('/sqlid', function(req,res){
	let con = mysql.createConnection({
		host: "localhost",
		user: "root",
		database: 'test'
	});
	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
	});
	console.log(req.body)
	let sql = "SELECT * FROM test_data Where Tid = ?";
	con.query(sql,[req.body.id], function (err, result) {
		if (err) throw err;
		console.log(result);
		res.send(result);
	});
	con.end();
})

app.get('/getweather', function (req, res) {
	var i = 0;
	var dataxml = '';
	var data = https.get(
		'https://data.tmd.go.th/api/Weather3Hours/V2/index.php?type=json&uid=u62house_umg&ukey=fafbcb9e2409c5fc9b4f62389279f8e7&fbclid=IwAR0kByu32MJETl6dQZZVZlJygFJ3eWr-hHD76um4ZJ9zFOUfyUqX8ZJ4U5o'
		, function (response) {
			response.setEncoding('utf-8')
			response.on('data', function (body) {
				i++;
				console.log(i);
				dataxml += body;
			});
			response.on('end', function () {
				res.setHeader("Content-Type", "text/xml; charset=utf-8");
				res.send(dataxml);
			});
		}
	)
	data.on('error', function (err) {
		console.log(err);
	})
})

app.post('/sqlChildOption',function(req,res){
	var PO = req.body.PO;
	console.log(PO)
	let con = mysql.createConnection({
		host: "localhost",
		user: "root",
		database: 'test'
	});
	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
	});
	console.log(req.body)
	let sql = "SELECT * FROM test_Childoption Where POid = ?";
	con.query(sql,[PO], function (err, result) {
		if (err) throw err;
		console.log(result);
		res.send(result);
	});
	con.end();
});

app.post('/Login',function(req,res){
	var acc = req.body.Account;
	var pass = req.body.Password;
	let con = mysql.createConnection({
		host: "localhost",
		user: "root",
		database: 'test'
	});
	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
	});
	let sql = "SELECT * FROM test_data Where Ttext = ? AND Tid = ?";
	con.query(sql,[acc,pass], function (err, result) {
		if (err) throw err;
		if (result[0]) {
			req.session.Account = result[0].Ttext;
			console.log(req.session);
			console.log(req.session.id);
			res.send(result);
		}
	});
	con.end();
});

app.post('/checkSession',function(req,res){
	console.log(req.session);
	console.log(req.sessionID);
	if (req.session.Account) {
		res.send('Success');
		console.log('session login')
		return;
	}
	res.send('Error');
});

app.get('/testpython',function(req,res){
	var {PythonShell} = require('python-shell');
	let pyshell = new PythonShell('./build/test.py');
	pyshell.on('message', function (message) {
		message = message.substr(1);
		//message = message.split('\'')[1]
		console.log(message);
		var a = Buffer(message);
		var b = new StringDecoder('utf-8')
		console.log(b.write(a));
		//message = utf8.decode(message);
		//message = decodeURIComponent(escape(message));
		res.send(message);
	});
});

app.get('/sqlChart',function(req,res){
	let con = mysql.createConnection({
		host: "localhost",
		user: "root",
		database: 'test'
	});
	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
	});
	let sql = "SELECT * FROM test_chartdata";
	con.query(sql, function (err, result) {
		if (err) throw err;
		res.send(result);
	});
	con.end();
});

app.post('/sqlDelete',function(req,res){
	let con = mysql.createConnection({
		host: "localhost",
		user: "root",
		database: 'test'
	});
	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
	});
	let sql = "DELETE FROM test_data WHERE Tid = ?";
	con.query(sql,req.body.id, function (err, result) {
		if (err) throw err;
		if(result.affectedRows > 0){
			res.send('success')
		}
		else {
			res.send('error')
		}
	});
	con.end()
});

app.post('/sqlUpdate',function(req,res){
	let con = mysql.createConnection({
		host: "localhost",
		user: "root",
		database: 'test'
	});
	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
	});
	let sql = "UPDATE test_data SET Ttext = ? WHERE Tid = ?";
	con.query(sql,[req.body.Ttext,req.body.id], function (err, result) {
		if (err) throw err;
		if(result.affectedRows > 0){
			res.send('success')
		}
		else {
			res.send('error')
		}
	});
	con.end()
});

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '/build/index.html'));
});

http.createServer(app).listen(port, function () {
	console.log("Server is running.. at port: %s", port);
});



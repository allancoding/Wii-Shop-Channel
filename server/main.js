var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');
var morgan = require("morgan");

var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.pem')
};

var app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/startup', function(req, res){
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);
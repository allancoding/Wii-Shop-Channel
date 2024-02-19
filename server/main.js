var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/startup', function(req, res){
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(function(req, res, next){
  console.log(req.method, req.url);
  next();
});
http.createServer(app).listen(80);
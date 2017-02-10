var express = require('express');
var fs = require('fs');

var app = express();
app.get('/home', function(req,res){

res.sendFile(__dirname +'/index.html');
});
app.get('/contact', function(req,res){

res.sendFile(__dirname +'/contact.html');
});

app.listen(3001);

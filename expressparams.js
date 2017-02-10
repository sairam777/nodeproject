var express = require('express');


var app = express();
app.get('/home', function(req,res){

res.sendFile(__dirname +'/index.html');
});
app.get('/contact', function(req,res){

res.sendFile(__dirname +'/contact.html');
});

app.get('/profile/:name', function(req,res){
res.send("You are requested to the given name is:" + req.params.name);

});

app.listen(3001);

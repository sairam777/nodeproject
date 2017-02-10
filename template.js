var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var session = require('express-session');
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
var urlencodedParser = bodyParser.urlencoded({ extended: true });
// var bodyjson = bodyParser.json();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
var conn = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'admin',
  database : 'nodedb'
});
conn.connect();
app.get('/getdata',function(req,res){
  conn.query("select * from inno", function(err,data){
    console.log(data);
  });
});


app.set('view engine', 'ejs');
app.use('/assests',express.static('assests'));

app.get('/', function(req,res){
//res.sendFile(__dirname +'/index.html');
res.render('index',{msgg:''});
});
app.post('/postdata', function(req, res){
  console.log(req.body);
  conn.query("insert into department values('"+req.body.who+"', '"+req.body.department+"','"+req.body.email+"')", function(err, data){
    console.log(data);
  });
});
app.post('/welcomepage', function(req, res){
  var count = 0;
  conn.query("select * from login", function(err, data){
    for(var i=0; i<data.length; i++){
      if(data[i].uname == req.body.uname && data[i].password == req.body.password ){
          count++;
      }
    }
    if(count != 0){
      res.render('welcome',{data:req.body});
      console.log("logged in");
    }
    if(count == 0){
      res.render('index',{msgg:'wrong credential'});
      console.log("wrong credentials");
    }
  })
})
app.post('/',urlencodedParser, function(req,res){
console.log(req.body);
req.session.user = req.body.uname;
console.log("session cresated",req.session);
res.render('welcome',{data:req.body});
});


app.post('/index',urlencodedParser, function(req,res){
  conn.query("select * from login", function(error,data){
    if(error){

      console.log(error);
    }
    else{
      var j=0;
      for(var i=0; i<data.length;i++){
        if(data[i].uname==req.body.uname){
          j++;
        }
      }
      if(j==0){
        conn.query("insert into login values('"+req.body.uname+"', '"+req.body.password+"')", function(err, data){
          console.log(data);

        });
          res.render('index',{msgg:''});
      }
      else{
        console.log("already register..Try with another username");
          res.render('register',{msgg:'already register..Try with another username'});
      }
    }
  });


});


app.get('/register', function(req,res){
//console.log(req.body);
res.render('register',{msgg:''})
//,{data:req.body});
});

// app.post('/welcome',urlencodedParser, function(req,res){
// console.log(req.body);
// res.render('welcome',{data:req.body});
// });


app.get('/contact', function(req,res){

//res.sendFile(__dirname +'/contact.html');
//res.render('contact');
res.render('contact', {qs: req.query});
});

app.post('/contact',urlencodedParser, function(req,res){
console.log(req.body);
res.render('contact-success', {data:req.body});

});



app.get('/profile/:name', function(req,res){
  var data = {age : 29, EmpId: 2453, hobbies:['eating','browsing','travelling']};
res.render('profile', {person: req.params.name, data :data});

});

app.listen(3004);
console.log("Reading port:3004");

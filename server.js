"use strict";
const html = __dirname + '/dist/sad-blog';
const port = 4000;
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const mysql = require("mysql");
let app = express();

const sadBlogPool = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sadBlog'
});

sadBlogPool.connect();

//Server-Config
app.use(compression())
  .use(bodyParser.json())
  .use(express.static(html))
  .listen(port, function () {
    console.log('Port: ' + port);
    console.log('HTML: ' + html);
  });
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function addNewUser(req, res){
  const post = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  sadBlogPool.query(`SELECT username, email, password FROM logins WHERE username='${req.body.username} '`, (err, results) => {
    if(!results[0]) {
      sadBlogPool.query(`SELECT username, email, password FROM logins WHERE email='${req.body.email}'`, (err, results) => {
        if(!results[0]){
          sadBlogPool.query(`INSERT INTO logins SET ?`, post, (err) => {
            if(err){
              res.send("something went wrong").status(400);
            }else{
              res.send("true").status(200);
            }
          });
        }else{
          res.send("email already registered").status(400);
        }
      });
    }else{
      res.send("user already registered").status(400);
    }
  });
}

function loginBackend(req, res) {
  sadBlogPool.query(`SELECT username, email, password FROM logins WHERE username='${req.body.username}'`, (err, results, fields) => {
    if(!results[0]){
      res.send("user not found").status(400).end();
    }else{
      if(results[0].password === req.body.password){
        res.send(true).status(200);
      }else{
        res.send(false).status(400);
      }
    }
  });
}
//API
app.route("/api/login")
  .post(loginBackend);
app.route("/api/register")
  .post(addNewUser);

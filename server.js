var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var http = require('http');
var fs = require('fs');

var port = 8000;

var request = require('request');
var Client = require('node-rest-client').Client;

var basicAuth = '';

// =================
// middleware //
// =================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// enabling CORS //
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// =================
// regular Routes
// =================
app.get('/', function(req, res, next) {
  // res.send("welcome!");
});
app.post('/', function(req, res, next) {
 // Handle the post for this route
});
 
// =================
// API Routes
// =================
// get router instance for api routes
var apiRoutes = express.Router();

// apply the routes to our application with the prefix '/api'
// ------------------------------------
app.use('/api', apiRoutes);

// apiRoutes.get('/checkCookie', function(req, res, next){
//  res.send(req.cookies.JSESSIONID);
// });

apiRoutes.post('/authJira', function(req, res, next){
  client = new Client();
  basicAuth = "Basic " + new Buffer(req.body.username +":"+ req.body.password).toString('base64');
  // Provide user credentials, which will be used to log in to JIRA.
  var loginArgs = {
        data: {
            "username": req.body.username,
            "password": req.body.password
        },
        headers: {
            "Content-Type": "application/json"
        } 
  };
  client.post("https://dressler.atlassian.net/rest/auth/1/session", loginArgs, function(data, response){
        if (response.statusCode == 200) {
            console.log('successfully logged in!');
            var session = data.session;
      var token = session.name + '=' + session.value;

      //-----------set cookie----------------------//
      res.cookie('Set-Cookie', session.name + '=' + session.value, { expires: new Date(253402300000000), httpOnly: false}).send('success');
      //-------------------------------------------//

        }
        else {
            console.log("Login failed :(");
            res.send('fail');
        }
  });
});


apiRoutes.post('/queryIssue', function(req, response, next){
  var options = {
    url: 'https://dressler.atlassian.net/rest/api/latest/issue/' +req.body.issue,
    headers: {
      "Authorization" : basicAuth
    }
  }

  request(options, function (err, res, body) {
    if (err) {
      console.dir(err);
      return;
    }
    if(body){
      body = JSON.parse(body);
      response.send(body);
    } else {
      response.send("fail");
    }
  }) 
  // .on('data', function(data) {
  //     res.end(JSON.parse(data));
  //   })
});

apiRoutes.post('/downloadAttachments', function(req, response, next){
    console.log("fired!!");
    console.log(req.body);
    var fileCount = 1;
    console.log("==========");
    for(url in req.body.attachmentsArray){
        console.log(req.body.attachmentsArray[url]);
        var downloadDest = './downloads/file_'+fileCount;
        console.log(downloadDest);
        download(req.body.attachmentsArray[url], downloadDest, function(data){
            response.send(data);
        });
        fileCount++;
    }
    // for(var j=0; j<req.body.attachmentsArray.length; j++){
    //     console.log(req.body.attachmentsArray);
    //     console.log('^^^');
    // };
    function download(url, dest, cb) {
      var file = fs.createWriteStream(dest);
      var request = http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
          file.close(cb);  // close() is async, call cb after close completes.
        });
      }).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
      });
    };        
});





// =================
// node server up
// =================
app.listen(process.env.PORT || port);
console.log('Magic is happening at http://localhost:' +port);
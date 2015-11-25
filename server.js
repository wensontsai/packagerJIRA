var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var port = 8000;

var Client = require('node-rest-client').Client;


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
// 	res.send(req.cookies.JSESSIONID);
// });

apiRoutes.post('/authJira', function(req, res, next){
	client = new Client();
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

apiRoutes.post('/queryIssue', function(req, res, next){
	// Get the session information and store it in a cookie in the header
	var queryArgs = {
        headers: {
			// Set the cookie from the session information
            cookie: session.name + '=' + session.value,
            "Content-Type": "application/json"
        },
        data: {
			// Provide additional data for the JIRA search. You can modify the JQL to search for whatever you want.
            // jql: "type=Bug AND status=Closed"
        }
	};

	// Make the request return the search results, passing the header information including the cookie.
    client = new Client();
console.log("https://dressler.atlassian.net/rest/api/latest/issue/" +req.body.issue);
	client.get("https://dressler.atlassian.net/rest/api/latest/issue/" +req.body.issue, queryArgs, function(searchResult, response) {
	    console.log('status code:', response.statusCode);
	    console.log('search result:', searchResult);
	});
});





// =================
// node server up
// =================
app.listen(process.env.PORT || port);
console.log('Magic is happening at http://localhost:' +port);
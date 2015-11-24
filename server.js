var express = require('express');
var app = express();
var bodyParser = require('body-parser');



// =================
// regular Routes
// =================
app.get('/', function(req, res, next) {
  // Handle the get for this route
});
app.post('/', function(req, res, next) {
 // Handle the post for this route
});

// =================
// middleware //
// =================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// enabling CORS //
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


 
// =================
// API Routes
// =================
// get router instance for api routes
var apiRoutes = express.Router();

// apply the routes to our application with the prefix '/api'
// ------------------------------------
app.use('/api', apiRoutes);


apiRoutes.post('/authJira', function(req, res){
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
	console.log(loginArgs);
	client.post("https://dressler.atlassian.net/rest/auth/1/session", loginArgs, function(data, response){
	        if (response.statusCode == 200) {
	                console.log('succesfully logged in, session:', data.session);
	                var session = data.session;
	                // Get the session information and store it in a cookie in the header
	                var searchArgs = {
	                        headers: {
									// Set the cookie from the session information
	                                cookie: session.name + '=' + session.value,
	                                "Content-Type": "application/json"
	                        },
	                        data: {
									// Provide additional data for the JIRA search. You can modify the JQL to search for whatever you want.
	                                jql: "type=Bug AND status=Closed"
	                        }
	                };
					// Make the request return the search results, passing the header information including the cookie.
	                client.post("https://dressler.atlassian.net/rest/api/2/search", searchArgs, function(searchResult, response) {
	                        console.log('status code:', response.statusCode);
	                        console.log('search result:', searchResult);
	                });
	        }
	        else {
	                throw "Login failed :(";
	        }
	});
});







// =================
// node server up
// =================
app.listen(process.env.PORT || 8000);
console.log('Magic is happening at http://localhost:' +port);
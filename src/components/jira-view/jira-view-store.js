var Reflux = require('reflux');

var Actions = require('../../actions');

var JiraApi = require('../../utils/jira-api');
var Client = require('node-rest-client').Client;

module.exports = Reflux.createStore({
	// if any actions get called, and you have method of same name, invoke it
	// subscribed to Actions
	listenables: [
		Actions
	],
	// getTopics: function(){
	// 	// AJAX request thru Fetch
	// 	return Api.get('topics/defaults')
	// 			.then(function(json){
	// 				this.topics = json.data;
	// 				this.triggerChange();
	// 			}.bind(this) );
	// },
	authJira: function(username, password){
// 		var paramsObj = {
// 			url: 'auth/1/session',
// 			base64encoded : window.btoa(username +":"+ password)
// 		};
// console.log(paramsObj);
// 		// AJAX request thru Fetch
// 		JiraApi.getAuth(paramsObj)
// 			.then(function(data){
// 				console.log(data);
// 				this.worked = "yes talked to JIRA!";
// 				this.triggerChange();
// 				this.setCookie(data.name, data.value, 365);
// 			});
		
		client = new Client();
		// Provide user credentials, which will be used to log in to JIRA.
		var loginArgs = {
		        data: {
		                "username": username,
		                "password": password
		        },
		        headers: {
		                "Content-Type": "application/json"
		        } 
		};
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




	},
	getIssue: function(){
// 		JiraApi.get('api/latest/issue/WQS-11')
// 			.then(function(data){
// console.log(data);
// 			});
		var jiraApi = require('jira').JiraApi;

		var config = {
		    "username": "wenson.tsai",
		    "password": "password",
		    "port": 443,
		    "host": "dressler.atlassian.net"
		}
console.log(config);
		var issueNumber = "WQS-11";

		var jira = new jiraApi('https', config.host, config.port, config.username, config.password, '2');
		jira.findIssue(issueNumber, function(error, issue) {
		    console.log('Status: ' + issue.fields.status.name);
		});




	},
	getCookie: function(){
		var dc = document.cookie;
	    var prefix = 'JiraToken' + "=";
	    var begin = dc.indexOf("; " + prefix);
console.log(begin);
	    if(begin !== -1){
			this.showLogin = false;
			this.triggerChange();
	    }
	    return;
	},
	setCookie: function(name, value, days){
		var today = new Date();
		var expire = new Date();
		if (nDays==null || nDays==0) nDays=1;
		expire.setTime(today.getTime() + 3600000*24*nDays);
		document.cookie = cookieName+"="+escape(cookieValue)
		             + ";expires="+expire.toGMTString();
		this.showLogin = false;
		this.triggerChange();
	},
	triggerChange: function(){
		// Reflux emits 'change' : Reflux.trigger(event, emitObj)
		this.trigger('change', this.showLogin);
		this.trigger('change', this.worked);
	}
});
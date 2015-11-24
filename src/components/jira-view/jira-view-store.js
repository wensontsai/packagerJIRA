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
	authJira: function(username, password){
		var paramsObj = {
			// url: 'auth/1/session',
			// base64encoded : window.btoa(username +":"+ password)
			username: username,
			password: password
		};
		//=========================//
		// FETCH version           //
		//=========================//
		// JiraApi.getAuth(paramsObj)
			// .then(function(data){
			// 	console.log(data);
			// });

		//=========================//
		// AJAX version            //
		//=========================//
		JiraApi.getAuth(paramsObj, function(data){
			if(data === 'success'){
				Actions.authSuccess();
			} 
			Actions.authFailure();
		});
	},
	getIssue: function(){
// 		JiraApi.get('api/latest/issue/WQS-11')
// 			.then(function(data){
// console.log(data);
// 			});
// 		var jiraApi = require('jira').JiraApi;

// 		var config = {
// 		    "username": "wenson.tsai",
// 		    "password": "password",
// 		    "port": 443,
// 		    "host": "dressler.atlassian.net"
// 		}
// console.log(config);
// 		var issueNumber = "WQS-14";

// 		var jira = new jiraApi('https', config.host, config.port, config.username, config.password, '2');
// 		jira.findIssue(issueNumber, function(error, issue) {
// 		    console.log('Status: ' + issue.fields.status.name);
// 		});
	},
	authFailure: function(){
		this.errorMsg = 'Login Failed!'
		this.trigger('change', this.errorMsg);
	},
	authSuccess: function(){
		// Reflux emits 'change' : Reflux.trigger(event, emitObj)
		this.showLogin = 'false';
		this.trigger('change', this.showLogin);
	}
});
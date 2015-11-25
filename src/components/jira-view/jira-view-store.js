var React = require('react');var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(Reflux); 
var Actions = require('../../actions');

var JiraApi = require('../../utils/jira-api');
var Client = require('node-rest-client').Client;

module.exports = Reflux.createStore({
	mixins: [
		StateMixin
	],
	// if any actions get called, and you have method of same name, invoke it
	// subscribed to Actions
	listenables: [
		Actions
	],
	getInitialState: function(){
		return {
			showLogin : true,
			errorMsg : ''
		}
	},
	checkCookie: function(){
		var name = 'JSESSIONID';
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
console.log(parts);
		if (parts.length === 2) {
			this.setState({ showLogin: false });
			console.log(parts.pop().split(";").shift());
			return parts.pop().split(";").shift();
		}
		this.setState({ showLogin: true });
	},
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
				this.setState({ showLogin : false });
			}
			if(data === 'fail'){
				this.setState({ errorMsg: 'login failed :(' });
			}
		}.bind(this) );
console.log(this.state.errorMsg);
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
	}

});
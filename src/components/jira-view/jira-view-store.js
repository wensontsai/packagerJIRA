var Reflux = require('reflux');
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
			showLogin : false,
			errorMsg : ''
		}
	},
	componentDidMount: function(){
		// check for cookie and update showLogin state
		var cookieName = 'JSESSIONID';
		this.checkCookie(cookieName);
	},
	checkCookie: function(name){
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		console.log(parts);
		if (parts.length === 2) {
			this.setState({ showLogin: false });
			console.log(parts.pop().split(";").shift());
			return parts.pop().split(";").shift();
		}
		return this.setState({ showLogin: true });
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
				this.showLogin = 'false';
				this.updateLoginView();
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
	updateLoginView: function(){
		this.setState({ showLogin : this.showLogin });
	},
	authSuccess: function(){
		// Reflux emits 'change' : Reflux.trigger(event, emitObj)
		// this.trigger('change', this.showLogin);
	},
	// storeDidUpdate: function(prevState){
	// 	if(this.state.showLogin !== prevState.showLogin){
	// 		console.log('showLogin value changed!');
	// 	}
	// }
});
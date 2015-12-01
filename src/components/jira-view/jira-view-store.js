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
			// auth shit //
			showLogin : true,
			errorMsg : '',
			// JIRA issues //
			issuesArray : [],
			token : '',
			attachments : []
		}
	},
	checkCookie: function(){
		var value = document.cookie;
		var cookies = value.split("; ");
console.log(cookies);
		for(i in cookies){
			if(cookies[i].indexOf("=")  >= 0 ){
				var splitVal = cookies[i].split("=");
				if(splitVal.indexOf("JSESSIONID") >= 0){
					var token = splitVal[1];
console.log(splitVal[0] +'='+ splitVal[1]);
					if(token){
						// They've been here before.
						this.setState({ 
							token: splitVal[0] +'='+ splitVal[1],
							showLogin: false 
						});
						return;
					} 	
				}
			}
		this.setState({ showLogin: true });
		}
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
	},
	addToIssues: function(issue){
		this.setState({ issuesArray: this.state.issuesArray.concat([issue]) });
		console.log(this.state.issuesArray);
		// hit up JIRA api //
		this.queryIssue(issue);
	},
	queryIssue: function(issue){
		var paramsObj = {
			issue : issue,
			token: this.state.token
		}
		JiraApi.queryIssue(paramsObj, function(data){
			console.log(data);
			this.setState({ attachments: data.fields.attachment});
			console.log(this.state.attachments);
			if(data === 'success'){
				console.log("ʕ •ᴥ•ʔ");
				// this.setState({ showLogin : false });
			}
			if(data === 'fail'){
				console.log("(╯°□°)╯︵ ┻━┻");
				// this.setState({ errorMsg: 'login failed :(' });
			}
		}.bind(this) );
	}

});
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
			issueObj: {},
			attachmentsToGet: []
		}
	},
	checkAttachment: function(content){
		console.log(content);
		var tempAttachmentsToGet = this.state.attachmentsToGet;
		if(tempAttachmentsToGet.indexOf(content) > -1){
			tempAttachmentsToGet.splice(tempAttachmentsToGet.indexOf(content),1);
		} else {
			tempAttachmentsToGet.push(content);
		}
		this.setState({
			attachmentsToGet: tempAttachmentsToGet
		});
		console.log(this.state.attachmentsToGet);
	},
	downloadAttachments: function(){
		JiraApi.downloadAttachments(this.state.attachmentsToGet, function(data){
			console.log(data);
		}.bind(this) );
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
				this.setState({ errorMsg: ''});
			}
			if(data === 'fail'){
				this.setState({ errorMsg: 'login failed :(' });
			}
		}.bind(this) );
	},
	addToIssues: function(issue){
		// hit up JIRA api //
		if(issue.length > 0){
			this.queryIssue(issue);
			return;
		}
		this.setState({ errorMsg: "Please enter an issue number."});
	},
	queryIssue: function(issue){
		var paramsObj = {
			issue : issue,
			token: this.state.token
		}
		JiraApi.queryIssue(paramsObj, function(data){
			if(data !== 'fail'){
				console.log(data.fields.attachment);
				var insertObj = Object.create(null);
				insertObj = {
					issue: data.key,
					attachments: data.fields.attachment
				};
				// var insertObj = Object.create(null, {
				// 	issue: data.key,
				// 	attachments: data.fields.attachment
				// });


				this.completeIssue(insertObj);
				this.setState({ errorMsg: ''});
				return;
			}
			if(data === 'fail'){
				this.setState({
					errorMsg: 'Query failed!'
				});
			}
		}.bind(this) );
	},
	completeIssue: function(insertObj){
		this.setState({
			issueObj: insertObj
		});
		this.setState({ issuesArray: this.state.issuesArray.concat([this.state.issueObj]) });
		console.log(this.state.issuesArray);
	}

});
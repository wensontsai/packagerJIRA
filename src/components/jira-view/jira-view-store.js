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
			issueObj: {}
		}
	},
	checkAttachment: function(id){
		console.log(this.state.issueObj);
		console.log('fucking shit! ^^^');
		for(item in this.state.issueObj.attachments){
			if(this.state.issueObj.attachments[item].id === id){
				console.log('YASŠ');
				var newIssueObj = this.state.issueObj;
				if(newIssueObj.attachments[item].isChecked === 'checked'){
					newIssueObj.attachments[item].isChecked = '';
				} else {
					newIssueObj.attachments[item].isChecked = 'checked'
				}
				this.setState({
					issueObj: newIssueObj
				});
				console.log(this.state.issueObj);
			}
		}
		// this.setState({
		// 	issueObj:{
		// 		attachments[4]:{
		// 			isChecked : 'checked'
		// 		}
		// 	}
		// });
		console.log(id);

		// this.setState({
		//   	isChecked: !this.state.isChecked // flip boolean value
		//     }, 
		//     function() {
		//       console.log(this.state);
		//     }.bind(this)
		// );
		// console.log(this);
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
				this.completeIssue(data.key, data.fields.attachment);
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
	completeIssue: function(issue, attachments){
		this.setState({
			issueObj: {
				issue: issue,
				attachments: attachments
			}
		});
		this.setState({ issuesArray: this.state.issuesArray.concat([this.state.issueObj]) });
		console.log(this.state.issuesArray);
	}

});
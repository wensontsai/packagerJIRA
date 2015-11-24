var React = require('react');
var Reflux = require('reflux');

var JiraViewStore = require('./jira-view-store');
var Actions = require('../../actions');

var LoginJira = require('./login-jira');
var IssueInput = require('./issue-input');


module.exports = React.createClass({
	mixins:[
		Reflux.listenTo(JiraViewStore, 'onChange'),
		Reflux.listenTo(Actions.authFailure, 'authFailed'),
		Reflux.listenTo(Actions.authFailure, 'authSucceeded'),
	],
	getInitialState: function(){
		return {
			showLogin : false,
			errorMsg : ''
		}
	},
	componentDidMount: function(){
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
	render: function(){
		return(
			<div className="jira-view">
				{ this.state.showLogin ? <LoginJira /> : <IssueInput /> }
				<div className="errorMsg">
					{this.state.errorMsg}
				</div>
			</div>
		)
	},
	componentWillReceiveProps: function(nextProps){
		
	},
	// onChange: function(event, showLogin){
	// 	this.setState({
	// 		showLogin: showLogin
	// 	});
	// },
	authFailed: function(event, showLogin){
		this.setState({
			showLogin: true,
			errorMsg: "wtff broo"
		});
	},
	authSucceeded: function(event, showLogin){
		this.setState({
			showLogin: false,
			errorMsg: 'logged in'
		});
	}
});
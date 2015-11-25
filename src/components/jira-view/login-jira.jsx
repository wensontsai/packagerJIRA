var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(Reflux); 
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Actions = require('../../actions');

var JiraViewStore = require('./jira-view-store');

module.exports = React.createClass({
	mixins:[
		LinkedStateMixin,
		StateMixin.connect(JiraViewStore)
	],
	getInitialState: function(){
		return {
			username : '',
			password : '',
		}
	},
	render: function(){
		return(
			<div className="login-view">
				<div>
					Log in to JIRA
				</div>
				<input 
					type="text" 
					placeholder="username" 
					valueLink={this.linkState('username')}
				/>
				<input 
					type="password" 
					placeholder="password" 
					valueLink={this.linkState('password')}
				/>
				<button onClick={this.authJira}>Authenticate Jira</button>
				<div className="errorMsg">
					{this.state.errorMsg}
				</div>
			</div>
		)
	},
	authJira: function(){
		Actions.authJira(this.state.username, this.state.password);
		// clear UI input fields
		this.setState({
			username: '',
			password: ''
		});
	},
	getIssue: function(){
		Actions.getIssue();
	}
});
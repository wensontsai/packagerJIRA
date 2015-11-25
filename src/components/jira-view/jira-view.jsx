var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(Reflux); 

var JiraViewStore = require('./jira-view-store');
var Actions = require('../../actions');

var LoginJira = require('./login-jira');
var IssueInput = require('./issue-input');


module.exports = React.createClass({
	mixins:[
		StateMixin.connect(JiraViewStore)
	],
	componentDidMount: function(){
		// check for cookie and update showLogin state
		Actions.checkCookie();
	},
	render: function(){
		return(
			<div className="jira-view">
				{ this.state.showLogin ? <LoginJira /> : <IssueInput /> }
			</div>
		)
	},
	componentWillReceiveProps: function(nextProps){
		
	}
});
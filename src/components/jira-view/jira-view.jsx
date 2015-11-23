var React = require('react');
var Reflux = require('reflux');

var JiraViewStore = require('./jira-view-store');
var Actions = require('../../actions');

var LoginJira = require('./login-jira');
var IssueInput = require('./issue-input');


module.exports = React.createClass({
	mixins:[
		Reflux.listenTo(JiraViewStore, 'onChange')
	],
	getInitialState: function(){
		return {
			showLogin : true
		}
	},
	componentWillMount: function(){

	},
	render: function(){
		return(
			<div className="jira-view">
				{ this.state.showLogin ? <LoginJira /> : <IssueInput /> }
			</div>
		)
	},
	componentWillReceiveProps: function(nextProps){
		
	},
	onChange: function(event, images){

	}
});
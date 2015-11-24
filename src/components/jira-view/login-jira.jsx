var React = require('react');
var Reflux = require('reflux');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Actions = require('../../actions');

var Client = require('node-rest-client').Client;

var JiraViewStore = require('./jira-view-store');

module.exports = React.createClass({
	mixins:[
		LinkedStateMixin,
		Reflux.listenTo(JiraViewStore, 'onChange')
	],
	getInitialState: function(){
		return {
			username : '',
			password : '',
			token : '',
		}
	},
	render: function(){
		return(
			<div className="login-view">
				<div>
					Log in to JIRA
				</div>
				<input type="text" placeholder="username" valueLink={this.linkState('username')}/>
				<input type="password" placeholder="password" valueLink={this.linkState('password')}/>
				<button onClick={this.authJira}>Authenticate Jira</button>
			</div>
		)
	},
	authJira: function(){
		Actions.authJira(this.state.username, this.state.password);
	},
	getIssue: function(){
		Actions.getIssue();
	},
	// queryJira: function(){
		// query jira api for all attachments
		// allow user to select attachments to add
		//	// on add, call a script to do the computations
		//	// this script will 1.  download all attachments
		//	// 2. unzip packages
		//	// 3. diff packages, and only copy over folders that are duplicated
		//	//	in more recent timestamp package
		//	// 4.  re-package the package as production package
		//  // 5. query jira api, and upload as attachment to proper package issue#
		//	// 6. query jira api, and comment leaving correct instructions
		//  7.  links to jira issue with everything completed and ready to send over
	// },
	componentWillReceiveProps: function(nextProps){
		
	},
	onChange: function(event, images){

	}
});
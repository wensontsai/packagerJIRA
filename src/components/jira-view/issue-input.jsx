var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(Reflux); 
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Actions = require('../../actions');

var JiraViewStore = require('./jira-view-store');

var IssuesList = require('./issues-list');

module.exports = React.createClass({
	mixins:[
		LinkedStateMixin,
		StateMixin.connect(JiraViewStore)
	],
	getInitialState: function(){
		return {
			jiraIssue : ''
		}
	},
	render: function(){
		return(
			<div className="issue-input">
				<div>
					Add JIRA issues
				</div>
				<input 
					type="text" 
					placeholder="Enter Jira issue link" 
					valueLink={this.linkState('jiraIssue')}
				/>
				<button onClick={this.addToIssues}>Add</button>
				<div className="issuesArea">
					{this.state.errorMsg}
					<IssuesList />
				</div>
			</div>
		)
	},
	addToIssues: function(){
		if(this.state.jiraIssue.length > 0){
			Actions.addToIssues(this.state.jiraIssue);
			// clear UI input fields
			this.setState({
				jiraIssue: ''
			});
			return;
		}
		this.setState({ errorMsg: "Please enter legit JIRA issue number!"});
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

});
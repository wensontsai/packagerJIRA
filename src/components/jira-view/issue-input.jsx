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
				<div>
					<button 
						className="runButton"
						onClick={this.processAttachments}
					>
					meowrr
					</button>
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
	processAttachments: function(){
		console.log(this.state.issueObj);
		var attachmentsArray = this.state.issueObj.attachments.bind(this);
		for(var item in attachmentsArray){
			if(attachmentsArray[item].isChecked){
				console.log(attachmentsArray[item].isChecked);		
			}
		}
	}


});
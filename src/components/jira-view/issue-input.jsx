var React = require('react');
var Reflux = require('reflux');

var Actions = require('../../actions');

var IssuesList = require('./issues-list');

module.exports = React.createClass({
	mixins:[
		// Reflux.listenTo(ImageStore, 'onChange')
	],
	getInitialState: function(){
		return {
			jiraIssue : '',
		}
	},
	componentDidMount: function(){

	},
	render: function(){
		return(
			<div className="issue-input">
				<div>
					Add JIRA issues
				</div>
				<input value={this.state.jiraIssue} placeholder="Enter Jira issue link" />
				<button onClick={this.addToIssues}>Add</button>
				<div>
					<IssuesList />
				</div>
			</div>
		)
	},
	addToIssues: function(){
		
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
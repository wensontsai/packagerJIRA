var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(Reflux); 
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Actions = require('../../actions');

var JiraViewStore = require('./jira-view-store');

module.exports = React.createClass({
	mixins: [
		LinkedStateMixin,
		StateMixin.connect(JiraViewStore)
	],
	componentWillMount: function(){
		// Actions.getImages(this.props.params.id);
	},
	render: function(){
		return(
			<div className="topic">
				{this.renderIssues()}
			</div>
		);	
	},
	renderAttachments: function(attachmentsArray){
		return attachmentsArray.map(function(attachment, i){
			return (
				<div key={i}>
					{attachment.filename}
				</div>
			)
		});
	},
	renderIssues: function(){
		return this.state.issuesArray.map(function(issue){
			return (
				<div key={issue.id} {...issue}>
					<div className="issueText">
						{issue.issue}
					</div>
					<div className="attachments">
						{issue.attachments.map(function(attachment, i){
							return (
								<div key={i}>
									{attachment.filename}
								</div>
							)
						})}
					</div>
				</div>
			)
		});
	},
});
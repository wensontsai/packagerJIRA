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
				<ul>
					{this.renderIssues()}
				</ul>
			</div>
		);	
	},
	renderIssues: function(){
		return this.state.issuesArray.map(function(issue){
			return (
				<li key={issue.id} {...issue}>{issue}</li>
			)
		});
	}
});
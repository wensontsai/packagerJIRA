var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(Reflux); 
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Actions = require('../../actions');

var JiraViewStore = require('./jira-view-store');

var Issue = require('./issue');

module.exports = React.createClass({
	mixins: [
		LinkedStateMixin,
		StateMixin.connect(JiraViewStore)
	],
	componentWillMount: function(){
		// Actions.getImages(this.props.params.id);
	},
	render: function(){
		return (
			<div key={i}>
				{this.state.issuesArray.map(function(issue){
					issue.attachments.map(function(attachment, i){
						<label>
							<input 
								type="checkbox"
							/>
							{attachment.filename}
						</label>
					})
				})}
			</div>
		)
	},
	handleCheck: function(){
		console.log("okkdjsk");
	}
});
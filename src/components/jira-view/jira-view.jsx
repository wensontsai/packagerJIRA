var React = require('react');
var Reflux = require('reflux');
var IssueInput = require('./issue-input');

var Actions = require('../../actions');

module.exports = React.createClass({
	mixins:[
		// Reflux.listenTo(ImageStore, 'onChange')
	],
	getInitialState: function(){
		return {
			
		}
	},
	componentWillMount: function(){

	},
	render: function(){
		return(
			<div className="jira-view">
				<IssueInput>
				</IssueInput>
			</div>
		)
	},
	componentWillReceiveProps: function(nextProps){
		
	},
	onChange: function(event, images){

	}
});
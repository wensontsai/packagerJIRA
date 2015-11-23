var React = require('react');
var Reflux = require('reflux');
var JiraView = require('./jira-view/jira-view');
var StatusView = require('./status-view/status-view');



var Actions = require('../actions');

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
			<div className="pageCenter">
				<div>
					ok lets go
				</div>
				<JiraView></JiraView>
				<StatusView></StatusView>
			</div>
		)
	},
	componentWillReceiveProps: function(nextProps){
		
	},
	onChange: function(event, images){

	}
});
var React = require('react');
var Reflux = require('reflux');

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
			<div className="status-view">
			</div>
		)
	},
	componentWillReceiveProps: function(nextProps){
		
	},
	onChange: function(event, images){

	}
});
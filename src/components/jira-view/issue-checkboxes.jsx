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
	getDefaultProps: function () {
	   return {
	       onChange: function (event) { 
	       		void event; 
	       } // optional hook to propagate event upwards
	   };
	},

	getInitialState: function () {
	   // Use this.props.checked if passed in and truthy else default false
	   return { 
	   		value: ''
	   };
	},
	componentWillMount: function(){
		// Actions.getImages(this.props.params.id);
	},
	render: function(){
		return this.state.issuesArray.map(function(issue){
			return (
				<div key={i}>
					<label>
						<input 
							key={attachment.id}
							id={attachment.id}
							type="checkbox"
							checked="checked"
							onChange={this.onChange} 
						/>
						{attachment.filename}
					</label>
				</div>
			)
		});
	},
	checkedHandler: function(id){
		console.log(id);
	},
	onChange: function (event) {
        this.setState({ value: event.target.checked });
        this.props.onChange(event);
    }
});
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
	getInitialState: function(){
		return {
			isChecked : false
		}
	},
	componentWillMount: function(){
		// Actions.getImages(this.props.params.id);
	},
	render: function(){
		return(
			<div className="attachments">
				{this.props.map(function(attachment, i){
					return (
						<div key={i}>
							<label>
								<input 
									checked={this.state.isChecked}
									value={attachment.content}
									type="checkbox"
									onChange={this.toggleChange}
								/>
								{attachment.filename}
							</label>
						</div>
					)
				}, this )}
			</div>
						
		);	
	},
	toggleChange: function() {
    this.setState({
      	isChecked: !this.state.isChecked // flip boolean value
	    }, 
	    function() {
	      console.log(this.state);
	    }.bind(this)
    );
  },
	handleChange: function(i, event){
	   console.log('handleChange');
	   console.log(event);
	   console.log(i);
	   this.setState({
				checked: !this.state.checked
	   });
	 },
});
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
			<div className="topic">
				{this.state.issuesArray.map(function(issue){
					return (
						<div className="issuesArea" key={issue.id} {...issue}>
							<div className="issueText">
								{issue.issue}
							</div>
							<div className="attachments">
								{issue.attachments.map(function(attachment){
									return (
										<div key={attachment.id}>
											<label>
												<input 
													checked={this.state.isChecked}
													value={attachment.content}
													type="checkbox"
													onChange={this.toggleChange.bind(this, attachment.id)}
												/>
												{attachment.filename}
											</label>
										</div>
									)
								}, this )}
							</div>
						</div>
					)
				}, this )}
			</div>
		);	
	},
	toggleChange: function(id) {
    console.log('fucking shit! ^^^');
    console.log(id);
    // this.setState({
    //   	isChecked: !this.state.isChecked // flip boolean value
    //     }, 
    //     function() {
    //       console.log(this.state);
    //     }.bind(this)
    // );
    // console.log(this);
  },
	handleChange: function(i, event){
	   console.log('handleChange');
	   console.log(event);
	   console.log(i);
	   this.setState({
				checked: !this.state.checked
	   });
	 },
	 addToDownload: function(id){

	 },
	 removeToDownload: function(id){

	 }
});
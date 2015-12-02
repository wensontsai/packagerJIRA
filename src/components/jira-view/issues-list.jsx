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
			checked : false
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
								{issue.attachments.map(function(attachment, i){
									return (
										<div key={i}>
											<label>
												<input 
													checked={this.state.checked}
													value={attachment.content}
													type="checkbox"
													onChange={this.handleChange}
												/>
												{attachment.filename}
											</label>
										</div>
									)
								}.bind(this))}
							</div>
						</div>
					)
				}.bind(this))}
			</div>
		);	
	},
	handleChange: function(){
	   console.log('handleChange');
	   this.setState({
				checked: !this.state.checked
	   });
	 },
});
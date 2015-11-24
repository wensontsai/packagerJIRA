var React = require('react');
var Reflux = require('reflux');

var Actions = require('../../actions');

module.exports = React.createClass({
	mixins: [
		// Reflux.listenTo(ImageStore, 'onChange')
	],
	getInitialState: function(){
		return{
			IssuesArray : []
		}
	},
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
	renderIssues: function(){
		return this.state.IssuesArray.map(function(issue){
			return <IssuesList key={issue.id} {...issue} />
		});
	},
	componentWillReceiveProps: function(nextProps){
		// Actions.getImages(nextProps.params.id);
	},
	onChange: function(event, images){
		// this.setState( {images: images} )
	}
});
var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin')(Reflux); 

var JiraViewStore = require('./jira-view-store');
var Actions = require('../../actions');

var LoginJira = require('./login-jira');
var IssueInput = require('./issue-input');


module.exports = React.createClass({
	mixins:[
		// Reflux.listenTo(JiraViewStore, 'onChange'),
		// Reflux.connect(JiraViewStore, 'currentStatus'),
		// Reflux.ListenerMixin,
		StateMixin.connect(JiraViewStore)
	],
	// getInitialState: function(){
	// 	return {
	// 		showLogin : JiraViewStore.state.showLogin,
	// 		errorMsg : JiraViewStore.state.errorMsg
	// 	}
	// },
	componentDidMount: function(){
		// listen to store updates on state
		// this.listenTo(JiraViewStore.showLogin, this.updateShowLogin);
		// this.listenTo(JiraViewStore.errorMsg, this.updateErrorMsg);
		console.log(this.state.showLogin);
		console.log(this.state.errorMsg);
		// this.listenTo(
  //           JiraViewStore,
  //           (state)=>{
  //               this.setState({
  //                   showLogin: state.showLogin,
  //                   errorMsg: state.errorMsg
  //               })
  //           });
	},
	render: function(){
		return(
			<div className="jira-view">
				{ this.state.showLogin ? <LoginJira /> : <IssueInput /> }
			</div>
		)
	},
	componentWillReceiveProps: function(nextProps){
		
	},
	// updateShowLogin: function(){
	// 	this.setState({ showLogin : showLogin });
	// },
	// updateErrorMsg: function(){
	// 	this.setState({ errorMsg : errorMsg });
	// },
	// onChange: function(event, showLogin){
	// 	this.setState({
	// 		showLogin: showLogin
	// 	});
	// }
});
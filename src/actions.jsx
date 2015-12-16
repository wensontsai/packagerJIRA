var Reflux = require('reflux');

module.exports = Reflux.createActions([
	// auth shit //
	'checkCookie',
	'authJira',
	// query routes //
	'getIssue',
	// JIRA issues //
	'addToIssues',
	// JIRA attachments //
	'checkAttachment'
]);
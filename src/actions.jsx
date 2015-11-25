var Reflux = require('reflux');

module.exports = Reflux.createActions([
	'checkCookie',
	'authJira',
	'getIssue',
	'authSuccess',
	'authFailure'
]);
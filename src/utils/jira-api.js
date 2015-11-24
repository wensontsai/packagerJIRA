var rootUrl = 'https://dressler.atlassian.net/rest/';
var Fetch = require('whatwg-fetch');

// latest/issue/JRA-9 // - to access issue object //

module.exports = {
	getAuth: function(paramsObj){
		var queryObject = {
			method: 'POST',
			// headers: {
			//   'Accept': 'application/json',
			//   'Authorization' : 'Basic ' +paramsObj.base64encoded
			// },
			body: JSON.stringify({
				username : paramsObj.username,
				password : paramsObj.password
			})
		}
	// console.log(rootUrl + paramsObj.url);
	console.log(queryObject);
		return fetch('/api/authJira', queryObject)
		.then(function(response){
			// return response.json();
			return response;
		});
	},
	get: function(url){
		return fetch(rootUrl + url, {
			// headers: { 
			// 	'Authorization': 'Client-ID ' + apiKey
			// }

			// *********************************
			// include cookie in header?
			// *********************************

		})
		.then(function(response){
			return response.json();
		});
	},
	
};
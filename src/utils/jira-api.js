var rootUrl = 'https://dressler.atlassian.net/rest/';
var Fetch = require('whatwg-fetch');
// require('es6-promise').polyfill();
// require('isomorphic-fetch');

module.exports = {
	//=========================//
	// FETCH version           //
	//=========================//

// 	getAuth: function(paramsObj){
// 		var queryObject = {
// 			method: 'post',
// 			headers: {
// 			  'Content-Type': 'application/json',
// 			  'Accept': 'application/json',
// 			  // 'Authorization' : 'Basic ' +paramsObj.base64encoded
// 			},
// 			body: JSON.stringify({
// 				username : paramsObj.username,
// 				password : paramsObj.password
// 			})
// 		}
// 		fetch('/api/authJira', queryObject)
// 			// .then(function(response){
// 			// 	return response.json();
// 			// })
// 			// .then(function(json) {
// 			//     console.log('parsed json', json)
// 			//   })
// 			// .catch(function(ex) {
// 			//     console.log('parsing failed', ex)
// 			//   })
// 	},

	//=========================//
	// AJAX version            //
	//=========================//
	getAuth : function(paramsObj, callback){
		$.ajax({
				type: 'POST',
				url: '/api/authJira',
				data: {
				username : paramsObj.username,
				password : paramsObj.password
				},
			})
			.done((data) => {
				callback(data);
			})
			// .fail((jqXhr) => {
			//   this.actions.addCharacterFail(jqXhr.responseJSON.message);
			// });
		 
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
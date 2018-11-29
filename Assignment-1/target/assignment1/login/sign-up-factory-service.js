//preferably server data manipulation for display purpose can be handled in service
signupApp.factory("signupFactory", function($http) {
	var _signup = function(user) {
		// all form level basic validations are through
		// simulate call to server
		return $http.get("sign-in-response.json").then(function(response) {
			return response.data;
		});
	};
	return {
		signup : _signup
	};
});
/**
 * This file has all the server based context & URI in one place
 */
buddyListApp.service("buddyListServiceFacade", function($http) {
	var _addBuddy = function(user) {
		// below should be the actual call to backend server to add a resource
		/*
		 * return
		 * $http.put("url/for/adding/new/resource").then(function(response) {
		 * return response.data; });
		 */
		// below is dummy GET call to send response json from local file
		return $http.get("buddy-add-response.json").then(function(response) {
			return response.data;
		});
	};
	var _deleteBuddy = function(user) {
		// below should be the actual call to backend server to delete a
		// resource
		/*
		 * return
		 * $http.delete("url/for/delete/resource").then(function(response) {
		 * return response.data; });
		 */
		// below is dummy GET call to send response json from local file
		return $http.get("buddy-delete-response.json").then(function(response) {
			return response.data;
		});
	};
	var _prioritizeBuddy = function(users) { // When one user is changed, it
		// might affect the priority of
		// other users
		// below should be the actual call to backend server to patch a resource
		/*
		 * return $http.patch("url/for/patch/resource").then(function(response) {
		 * return response.data; });
		 */
		// TODO later
	};

	var _getBuddies = function() {
		// below should be the actual call to backend server to get resource
		/*
		 * return $http.get("url/for/getting/resource").then(function(response) {
		 * return response.data; });
		 */
		// below is dummy GET call to send response json from local file
		var promise = $http.get("buddies.json").success(function(response) {
			return response;
		});
		return promise;
	};
	return {
		addBuddy : _addBuddy,
		deleteBuddy : _deleteBuddy,
		prioritizeBuddy : _prioritizeBuddy,
		getBuddies : _getBuddies
	};
});
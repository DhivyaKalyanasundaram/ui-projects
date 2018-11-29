/**
 * These service should have business logic to manipulate the data format before sending to server. 
 * There might be multiple services to split operation of read / write etc basis. 
 * 
 * So a serviceFacade is provided to  have all the server's url at one place
 */
buddyListApp.service("buddyListService", function(buddyListServiceFacade, $http) {
	var _addBuddy = function(user) {
		return buddyListServiceFacade.addBuddy(user);
	};
	var _deleteBuddy = function(user) {
		return buddyListServiceFacade.deleteBuddy(user);
	};
	var _prioritizeBuddy = function(users) {	//When one user is changed, it might affect the priority of other users
		return buddyListServiceFacade.prioritizeBuddy(user);
	};
	var _getBuddies = function() {
		/*buddyListServiceFacade.getBuddies().then(function(response) {
			var responseJson = angular.fromJson(response.data.buddies);
			return responseJson;
		});*/
		//FIX ME: Move to buddy-list-service-facade
		return $http.get("buddies.json").then(function(response) {
			return response.data;
		});
	};
	return {
		addBuddy : _addBuddy,
		deleteBuddy : _deleteBuddy,
		prioritizeBuddy : _prioritizeBuddy,
		getBuddies : _getBuddies
	};
});
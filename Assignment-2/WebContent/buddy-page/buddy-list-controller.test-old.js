/*
 * Unit test for buddy-list-controller.
 */
describe("Test buddy list controller ", function() {
	beforeEach(module("buddyListApp"));
	
	var mockGetData = {
	  data: [],
	  getBuddies: function(url, callback, error){
	    //emulate real work, any logic can be here
	    data.push("{\"id\": \"5\", \"user_name\": \"john.abraham@gmail.com\", \"first_name\": \"John\", \"last_name\": \"Abraham\", \"status\": \"Available\", \"email_address\": \"john.abraham@gmail.com\", \"birthdate\": \"07/07/1977\", \"last_sign_in\": \"N/A\", \"priority\": 1 }");
	    callback(data);
	  }
	};

	var $controller;

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));

	describe("$scope.buddyList ", function() {
		it("get buddy list from mock service ", function() {
			var $scope = {};
			$controller('buddyListController', { $scope: $scope });
			//expect($scope.buddyList).toEqual("[{\"id\": \"5\", \"user_name\": \"john.abraham@gmail.com\", \"first_name\": \"John\", \"last_name\": \"Abraham\", \"status\": \"Available\", \"email_address\": \"john.abraham@gmail.com\", \"birthdate\": \"07/07/1977\", \"last_sign_in\": \"N/A\", \"priority\": 1 }]");


		});
		
	});
	
});
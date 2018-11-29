describe("signupController", function() {
	beforeEach(module("signupApp"));

	var $controller;

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));

	describe("$scope.isPasswordMatch", function() {
		it("sets isPasswordNotMatch to true", function() {
			var $scope = {};
			$controller('signupController', {
				$scope : $scope
			});
			var user = {
				password : {value : "aaaaaa"},
				confirmPassword : {value : "aaaaaa"}
			};
			$scope.isPasswordMatch(user);
			expect($scope.isPasswordNotMatch).toEqual(false);
		});
		it("sets isPasswordNotMatch to true", function() {
			var $scope = {};
			var controller = $controller('signupController', {
				$scope : $scope
			});
			var user = {
				password : {value : "aaaaa1"},
				confirmPassword : {value : "aaaaaa"}
			};
			$scope.isPasswordMatch(user);
			expect($scope.isPasswordNotMatch).toEqual(true);
		});
	});
	
	
	/*describe("$scope.signup", function() {
		it("sets formError to 'Age does not meet the criteria'", function() {
			var $scope = {};
			var controller = $controller('signupController', $filter, {
				$scope : $scope
			});
			var user = {
				birthdate : "10/10/2010"
			};
			$scope.signup(user);
			expect($scope.formError).toEqual("Age does not meet the criteria");
		});
		it("sets formError to 'Age does not meet the criteria'", function() {
			var $scope = {};
			var controller = $controller('signupController', {
				$scope : $scope
			});
			var user = {
				birthdate : "10/10/1010"
			};
			$scope.signup(user);
			expect($scope.formError).toEqual("Age does not meet the criteria");
		});
		it("validation should be through", function() {
			var $scope = {};
			var controller = $controller('signupController', {
				$scope : $scope
			});
			var user = {
				birthdate : "10/10/2001"
			};
			$scope.signup(user);
			expect($scope.formError).toEqual(null);
		});
	});
	*/
	
});
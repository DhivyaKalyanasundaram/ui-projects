//preferably data in business requirement format send to server can be handled in controller
signupApp
		.controller(
				"signupController",
				function($scope, signupFactory, $filter, signupValues) {
					$scope.user = {
						username : {
							value : null,
							isValid : null
						// business level validations use isValid flag, BS uses
						// "has-error" flag to show error
						},
						password : {
							value : null,
							isValid : null
						},
						confirmPassword : {
							value : null,
							isValid : null
						},
						firstname : {
							value : null,
							isValid : null
						},
						lastname : {
							value : null,
							isValid : null
						},
						birthdate : {
							value : null,
							isValid : null
						},
					};

					$scope.helpers = commonHandlers.functions;
					$scope.formError = null;
					$scope.namePattern = "[A-Za-z]+";
					$scope.datePattern = "[01]\\d\/[0-3]\\d\/\\d{4}";
					$scope.isPasswordNotMatch = false;
					$scope.signup = function(user) {
						// all form level basic validations are through
						clearFlags();
						console.log("user.birthdate " + user.birthdate);
						if (user.birthdate) {
							var tempDate = new Date(user.birthdate.value);
							var years = $scope.helpers.dateDifference(
									user.birthdate.value, $filter("date")(
											new Date(), "MM/dd/yyyy")).years;
							console.log("years " + years);
							user.birthdateModified = $filter("dateFilter")(
									user.birthdate.value, "yyyy-MM-dd");
							if (years > 150 || years < 14) {
								$scope.formError = "Age does not meet the criteria";
								user.birthdate.isValid = "has-error";
							}
						}
						if (!$scope.formError) {
							signupFactory.signup(user).then(function(response) {
								if (response.status === "success") {
									$scope.userMessage = response.user_message;
								} else {
									$scope.formError = response.user_message;
								}
							});

						}
					};

					$scope.isPasswordMatch = function(user) {
						// check if password and confirm password fields match
						if (user && user.password.value
								&& user.confirmPassword.value) {
							$scope.isPasswordNotMatch = !(user.password.value === user.confirmPassword.value);
						}
					};

					var clearFlags = function() {
						$scope.formError = null;
						$scope.userMessage = null;
						$scope.user.username.isValid = null;
						$scope.user.password.isValid = null;
						$scope.user.confirmPassword.isValid = null;
						$scope.user.firstname.isValid = null;
						$scope.user.lastname.isValid = null;
						$scope.user.birthdate.isValid = null;
					};

				});
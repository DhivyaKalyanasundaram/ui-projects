/**
 * 
 */
buddyListApp
		.controller(
				"buddyListController",
				function($scope, $http) {
					$scope.buddy = {
						user_name : {
							value : null,
							isValid : null
						},
						first_name : {
							value : null,
							isValid : null
						},
						last_name : {
							value : null,
							isValid : null
						},
						email_address : {
							value : null,
							isValid : null
						},
						birthdate : {
							value : null,
							isValid : null
						},
						priority : {
							value : 1,
							isValid : null
						},
					};
					$scope.userMessage = "";
					$scope.formError = "";
					// delete dialog related params
					$scope.appTitle = "Delete request";
					$scope.showWarning = false;
					$scope.warningTopic = "Delete confirmation";
					$scope.warningMessageTemplate = "Do you wish to delete <buddy_name> ?";
					$scope.warningMessage = "Do you wish to delete <buddy_name> ?";
					$scope.addBuddyTopic = "Add buddy";
					$scope.addBuddyMessage = "Please enter the details. You can the prioritize the buddy in the buddy list page.";
					var deleteBuddyObj = {};
					$scope.priorityFilter = '';
					$scope.resultBuddyList = ""; // Display list
					$scope.buddyList = ""; // original list from server / stub
											// data
					$http.get("buddies.json").then(function(response) {
						var jsonStr = response.data.buddies;
						if (jsonStr) {
							$scope.buddyList = angular.copy(angular.fromJson(jsonStr));
							$scope.resultBuddyList = angular.copy(angular.fromJson(jsonStr));
						}
					});

					$scope.okDelete = function() {
						// Delete from list
						$scope.showWarning = false;
						var buddyListTemp = [];
						for (var b = 0; b < $scope.buddyList.length; b++) {
							if ($scope.buddyList[b].id !== deleteBuddyObj.id) {
								if ($scope.buddyList[b].priority > deleteBuddyObj.priority) {
									$scope.buddyList[b].priority = $scope.buddyList[b].priority - 1;

								}
								buddyListTemp.push($scope.buddyList[b]);
							}
						}
						$scope.resultBuddyList = buddyListTemp;
						$scope.buddyList = buddyListTemp;
						// delete $scope.resultBuddyList[deleteBuddyObj];
						// delete $scope.buddyList[deleteBuddyObj];
						$scope.userMessage = "User deleted successfully.";
					};

					var reprioritizeAndAddBuddy = function(buddyObj) {
						var buddyListTemp = $scope.resultBuddyList;
						// re-prioritize others
						for (var b = 0; b < buddyListTemp.length; b++) {
							buddyListTemp[b].priority = buddyListTemp[b].priority + 1;
						}
						buddyListTemp[buddyListTemp.length] = buddyObj;
						$scope.resultBuddyList = angular.copy(buddyListTemp);
						$scope.buddyList = angular.copy(buddyListTemp);
						$scope.userMessage = "User added successfully.";
					};

					var swapBuddy = function(buddyObj, isMoveUp) {
						var buddyObjIndex = $scope.resultBuddyList
								.indexOf(buddyObj);
						var priorityToCompare = buddyObj.priority + 1; // Default
																		// :
																		// Move
																		// down
						if (isMoveUp)
							priorityToCompare = buddyObj.priority - 1;
						if (isMoveUp) {
							for (var b = 0; b < $scope.resultBuddyList.length; b++) {
								if ($scope.resultBuddyList[b].priority == priorityToCompare) {
									$scope.resultBuddyList[b].priority = $scope.resultBuddyList[b].priority + 1;
								}
							}
							$scope.resultBuddyList[buddyObjIndex].priority = $scope.resultBuddyList[buddyObjIndex].priority - 1;
						} else {
							for (var b = 0; b < $scope.resultBuddyList.length; b++) {
								if ($scope.resultBuddyList[b].priority == priorityToCompare) {
									$scope.resultBuddyList[b].priority = $scope.resultBuddyList[b].priority - 1;
								}
							}
							$scope.resultBuddyList[buddyObjIndex].priority = $scope.resultBuddyList[buddyObjIndex].priority + 1;
						}

					};

					$scope.cancelDelete = function() {
						$scope.showWarning = false;
					};

					$scope.buddyClick = function(buddy) {
						resetMessages();
					}

					$scope.search = function(keyword) {
						resetMessages();
						var tempBuddyList = [];
						angular.forEach($scope.buddyList, function(buddy) {
							if (angular.toJson(buddy).indexOf(keyword) >= 0) {
								tempBuddyList.push(buddy);
							} else {
								buddy.searched = false;
							}
							$scope.resultBuddyList = angular.copy(tempBuddyList);
							
						});

					};

					$scope.deleteBuddy = function(buddy) {
						$scope.showWarning = true;
						resetMessages();
						deleteBuddyObj = buddy;
						$scope.warningMessage = angular
								.copy($scope.warningMessageTemplate.replace(
										"<buddy_name>", buddy.user_name));
					};

					$scope.moveUp = function(buddy) {
						resetMessages();
						swapBuddy(buddy, true);
					};

					$scope.moveDown = function(buddy) {
						resetMessages();
						swapBuddy(buddy, false);
					};

					$scope.okAdd = function(buddy) {
						buddy.priority = 1;
						buddy.id = $scope.buddyList.length + 1;
						buddy.status = "Available";
						var buddyTemp = {};
						buddyTemp = {
							id : buddy.id,
							status : buddy.status,
							user_name : buddy.user_name.value,
							first_name : buddy.first_name.value,
							last_name : buddy.last_name.value,
							email_address : buddy.email_address.value,
							birthdate : buddy.birthdate.value,
							priority : buddy.priority
						};
						reprioritizeAndAddBuddy(buddyTemp, true);
					};

					$scope.add = function() {
						resetMessages();
					};

					var resetMessages = function() {
						$scope.userMessage = "";
						$scope.formError = "";
					};
				});
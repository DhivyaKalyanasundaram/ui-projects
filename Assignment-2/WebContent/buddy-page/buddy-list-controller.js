/**
 * This controller takes care of manipulating data before sending to backend server
 * The functionalities involved are related to buddies list. Adding a new buddy, deleting, prioritize up, prioritize down
 * search a buddy are taken care in this controller. The controller then passes the data to dummy service to 
 * make changes persistent.
 */

buddyListApp
		.controller(
				"buddyListController", 
				function buddiesController($scope, buddyListService, buddyListValues) {
					//$scope.buddies = buddyListService();
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
					$scope.showWarning = false;
					$scope.deleteTitle = buddyListValues.messages.deleteTitle;
					$scope.deleteMessageTemplate = buddyListValues.messages.deleteMessageTemplate;
					$scope.addBuddyTitle = buddyListValues.messages.addBuddyTitle;
					$scope.addBuddyMessage = buddyListValues.messages.addBuddyMessage;
					var addUserMessageTemplate = buddyListValues.messages.addUserMessageTemplate;
					var deleteUserMessageTemplate = buddyListValues.messages.deleteUserMessageTemplate;
					var buddyNameParam = buddyListValues.messages.buddyNameParam;
					var deleteBuddyObj = {};
					$scope.priorityFilter = '';
					$scope.resultBuddyList = ""; // Display list
					$scope.buddyList = ""; // original list from server / stub
					// data
					buddyListService.getBuddies().then(function(response) {
						var jsonStr = response.buddies;
						if (jsonStr) {
							$scope.buddyList = angular
									.fromJson(jsonStr);
							$scope.resultBuddyList = angular.fromJson(jsonStr);
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
						$scope.userMessage = deleteUserMessageTemplate.replace(buddyNameParam, deleteBuddyObj.user_name);
					};

					var reprioritizeAndAddBuddy = function(buddy) {
						var buddyListTemp = $scope.buddyList;
						for (var b = 0; b < buddyListTemp.length; b++) {
							console.log("Buddy before " + buddyListTemp[b].priority + ", " + buddyListTemp[b].user_name);
						}
						// re-prioritize others
						for (var b = 0; b < buddyListTemp.length; b++) {
							buddyListTemp[b].priority = buddyListTemp[b].priority + 1;
						}
						buddyListTemp[buddyListTemp.length] = buddy;
						for (var b = 0; b < buddyListTemp.length; b++) {
							console.log("Buddy after " + buddyListTemp[b].priority + ", " + buddyListTemp[b].user_name);
						}
						$scope.resultBuddyList = angular.copy(buddyListTemp);
						$scope.buddyList = angular.copy(buddyListTemp);
						$scope.buddyList = angular.copy(buddyListTemp);
						$scope.userMessage = addUserMessageTemplate.replace(buddyNameParam, buddy.user_name);
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
							$scope.resultBuddyList = angular
									.copy(tempBuddyList);

						});

					};

					$scope.deleteBuddy = function(buddy) {
						$scope.showWarning = true;
						resetMessages();
						deleteBuddyObj = buddy;
						$scope.deleteMessage = angular
								.copy($scope.deleteMessageTemplate.replace(
										buddyNameParam, buddy.user_name));
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
						$scope.keyword = "";
					};
				});
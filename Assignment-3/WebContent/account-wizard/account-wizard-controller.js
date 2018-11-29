acctWizardApp
		.controller(
				"acctWizardController",
				function($scope, sharedProperties) {
					var isEnabledStatus = "done";
					$scope.userDetails = {
						user_name : "John_Abraham",
						first_name : "John",
						last_name : "Abraham",
						email : "john_abraham@gmail.com"
					};
					$scope.wizardProgress = [ {
						step : 1, // Light
						showCard : true,
						isCompleted : false,
						isEnabled : isEnabledStatus,
						accountType : "Light"
					}, {
						step : 2, // Standard
						showCard : false,
						isCompleted : false,
						isEnabled : "",
						accountType : "Standard",
						isOptedForPlus : false
					}, {
						step : 3, // Plus
						showCard : false,
						isCompleted : false,
						isEnabled : "",
						accountType : "Plus",
						plusOptions : []
					}, {
						step : 4, // Premium
						showCard : false,
						isCompleted : false,
						isEnabled : "",
						accountType : "Premium",
						isOptedForPremium : false
					} ];
					var accountType = $scope.wizardProgress[0].accountType; // setting
																			// to
																			// default
																			// Lite
																			// account
																			// type
					$scope.summary = "Summary : Account type currently selected is "
							+ accountType;

					$scope.enableStep = function(stepNum) {
						console.log("ENABLE STEP " + stepNum);
						switch (stepNum) {
						case 1:
							enableStepInternal(stepNum);
							break;
						case 2:
							if (!$scope.wizardProgress[0].isCompleted)
								return;
							enableStepInternal(stepNum);
							break;
						case 3:
							if (!$scope.wizardProgress[1].isCompleted)
								return;
							enableStepInternal(stepNum);
							break;
						case 4:
							if (!$scope.wizardProgress[2].isCompleted)
								return;
							enableStepInternal(stepNum);
							break;
						}
					};

					$scope.preProgress = function(stepNum) {
						switch (stepNum) {
						case 1:
							break;
						case 2:
							$scope.wizardProgress[1].showCard = false;
							$scope.wizardProgress[0].showCard = true;
							break;
						case 3:
							$scope.wizardProgress[2].showCard = false;
							$scope.wizardProgress[1].showCard = true;
							break;
						case 4:
							$scope.wizardProgress[3].showCard = false;
							$scope.wizardProgress[2].showCard = true;
							break;
						}
					}

					$scope.trackProgress = function(stepNum) {
						console.log("TRACK " + stepNum);
						switch (stepNum) {
						case 1:
							$scope.wizardProgress[0].isCompleted = true;
							$scope.wizardProgress[0].showCard = false;
							$scope.wizardProgress[1].showCard = true;
							$scope.wizardProgress[1].isEnabled = isEnabledStatus;
							break;
						case 2:
							$scope.wizardProgress[1].isCompleted = true;
							$scope.wizardProgress[1].showCard = false;
							$scope.wizardProgress[2].showCard = true;
							$scope.wizardProgress[2].isEnabled = isEnabledStatus;
							break;
						case 3:
							$scope.wizardProgress[2].isCompleted = true;
							$scope.wizardProgress[2].showCard = false;
							$scope.wizardProgress[3].showCard = true;
							$scope.wizardProgress[3].isEnabled = isEnabledStatus;
							break;
						case 4:
							break;
						}
						getAccountType();
					};

					$scope.setSummary = function() {
						getAccountType();
						var summary = {
							user_name : $scope.userDetails.user_name,
							account_type : accountType
						};
						sharedProperties.setSummary(summary);
					};

					var getAccountType = function() {
						var wiz = $scope.wizardProgress;
						console.log("GET ACCT TYPE");
						if (wiz[0].isEnabled === isEnabledStatus
								&& wiz[1].isOptedForPlus) {
							console.log("1 " + wiz[0].isEnabled + ", "
									+ wiz[1].isOptedForPlus);
							accountType = wiz[2].accountType;
							if (wiz[1].isEnabled === isEnabledStatus) {
								console.log("2 " + wiz[1].isEnabled);
								if (wiz[2].plusOptions
										&& wiz[2].plusOptions.length < 4) {
									console.log("3 " + wiz[2].plusOptions);
									accountType = wiz[1].accountType;
								} else if (wiz[2].plusOptions
										&& wiz[2].plusOptions.length > 3) {
									console.log("4 " + wiz[2].plusOptions
											+ ", " + wiz[3].isOptedForPremium);
									accountType = wiz[2].accountType;
									if (wiz[3].isOptedForPremium) {
										console.log("5 "
												+ wiz[3].isOptedForPremium);
										accountType = wiz[3].accountType;
									}
								}
							}
						} else if (wiz[0].isEnabled === isEnabledStatus
								&& !wiz[1].isOptedForPlus) {
							accountType = wiz[0].accountType;
							console.log("6 " + wiz[0].isEnabled + ", "
									+ wiz[0].isOptedForPlus);
						}
						$scope.wizardProgress = wiz;
						$scope.summary = "Summary : Account type currently selected is "
								+ accountType;
					};

					var enableStepInternal = function(stepNum) {
						console.log("ENABLE STEP INTERNAL " + stepNum);
						var wiz = $scope.wizardProgress;
						wiz[stepNum - 1].isEnabled = isEnabledStatus;

						for (var i = 0; i < wiz.length; i++) {
							console.log("INTERNAL " + i + wiz[i].showCard);
							wiz[i].showCard = false;
							if ((stepNum - 1) == i) {
								wiz[i].showCard = true;
							}
						}
						$scope.wizardProgress = wiz;
					};

					var disableStep = function(stepNum) {
						console.log("DISABLE STEP " + stepNum);
						switch (stepNum) {
						case 1:
							$scope.wizardProgress[0].isCompleted = true;
							$scope.wizardProgress[0].showCard = false;
							$scope.wizardProgress[1].showCard = true;
							$scope.wizardProgress[1].isEnabled = isEnabledStatus;
							break;
						case 2:
							$scope.wizardProgress[1].isCompleted = true;
							$scope.wizardProgress[1].showCard = false;
							$scope.wizardProgress[2].showCard = true;
							$scope.wizardProgress[2].isEnabled = isEnabledStatus;
							break;
						case 3:
							$scope.wizardProgress[2].isCompleted = true;
							$scope.wizardProgress[2].showCard = false;
							$scope.wizardProgress[3].showCard = true;
							$scope.wizardProgress[3].isEnabled = isEnabledStatus;
							break;
						case 4:
							break;
						}
					};
				});

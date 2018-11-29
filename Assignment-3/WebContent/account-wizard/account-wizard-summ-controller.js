acctWizardApp.controller("summaryController",
		function($scope, sharedProperties) {
			$scope.summary = sharedProperties.getSummary();
		});
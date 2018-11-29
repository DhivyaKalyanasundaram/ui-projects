acctWizardApp.config(function($routeProvider) {
	$routeProvider.when("/", {
		templateUrl : "account-wizard-steps.html",
		controller : "acctWizardController"
	}).when("/summary", {
		templateUrl : "account-summary.html",
		controller : "summaryController"
	});
});
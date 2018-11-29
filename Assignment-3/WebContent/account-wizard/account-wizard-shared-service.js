acctWizardApp.service('sharedProperties', function() {
	var summary = {
		user_name : "",
		account_type : ""
	};

	return {
		getSummary : function() {
			return summary;
		},
		setSummary : function(value) {
			summary = value;
		}
	};
});
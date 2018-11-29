//filter - format any input date to ISO 8601 standard 
//- can also be added to global scope and used instead of filters
signupApp.filter("dateFilter", function($filter) {
	return function(date, formatWith) {
		var tempDate = new Date(date);
		if (tempDate) {
			switch (formatWith) {
			case "yyyy":
			case "yyyy-MM":
			case "yyyy-MM-dd":
			case "yyyy-MM-ddThh:mmTZD":
			case "yyyy-MM-ddThh:mm:ssTZD":
			case "yyyy-MM-ddThh:mm:ss.sTZD":
				tempDate = $filter("date")(tempDate, formatWith); // can be
																	// enhanced
																	// to add
																	// timezone
				break;
			default:
				tempDate = "Date format not supported";
				console.error(tempDate);
			}
		}
		return tempDate;
	};
});

var signupApp = angular.module("signupApp", []);

/*
 * common utils that need not be injected in each module that needs them
 * input format for today, birthDate is MM/dd/yyyy
 * inputDt2 is recent and inputDt1 is older date
 */
var commonHandlers = commonHandlers || {};
commonHandlers.functions = {
	dateDifference : function(inputDt1, inputDt2) {
		if (inputDt1 && inputDt2) {
			var date1 = inputDt1.split('/'), date2 = inputDt2.split('/'), firstDate = new Date(
					date1[2], date1[1] - 1, date1[0]), secondDate = new Date(
					date2[2], date2[1] - 1, date2[0]);
			var msPerDay = 1000 * 60 * 60 * 24;
			var msBetween = secondDate.getTime() - firstDate.getTime();
			var _days = Math.floor(msBetween / msPerDay);
			var _months = Math.floor(_days * 12 / 365 * 12);
			var _years = Math.floor(_days / 365);
			return {
				days : _days,
				months : _months,
				years : _years
			};
		}
	}
};

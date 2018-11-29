describe("The date filter", function() {
	'use strict';
	var $filter;
	beforeEach(function() {
		module("signupApp");
		inject(function(_$filter_) {
			$filter = _$filter_;
		});
	});
	it("should return yyyy-MM-dd format", function() {
		var input = "11/11/2014", result;
		result = $filter("dateFilter")(input, "yyyy-MM-dd");
		expect(result).toEqual("2014-11-11");
	});
	it("should return date format not supported", function() {
		var input = "11/11/2014", result;
		result = $filter("dateFilter")(input, "yy-MM-dd");
		expect(result).toEqual("Date format not supported");
	});
});
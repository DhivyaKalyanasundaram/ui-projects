/*
 * Unit test for sign-up-factory-service.
 * FIX ME
 */

describe("Testing signupFacotry ", function() {
	
	var service, $httpBackend;
	
	beforeEach(function() {
		angular.module("signupApp");
		service = $injector.get('carService');
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when("GET", "../login/sign-in-response.json").respond("{\"status\": \"success\", \"user_message\": \"You are signed up successfully\"}");
	});

	it("should return json response ", inject(function(signupFactory) {
		service.signup("").then(function(response) {
            expect(response.data).not.to.equal(null); //the response is not null
        });
	}));

});


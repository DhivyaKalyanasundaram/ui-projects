/*
 * Unit test for buddy-list-controller.
 */
describe('products tests', function () {
				
				beforeEach(module('buddyListApp'));
				var $scope;
				var $controller;
				
				describe('no-mocking of service', function () {
					beforeEach(inject(function(_$controller_) {
					 	$controller = _$controller_;
					 	$scope = {};
					}));
	
					it('should return products list on load', function () {
						var buddyListCtrl = $controller('buddyListController', { $scope: $scope });
						expect($scope.buddyList).toEqual([{ name: 'Chai' }, { name: 'Syrup' }]);
					});
				});
});

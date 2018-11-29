/**
 * 
 */
buddyListApp.directive('modalDialog', function() {
	return {
		restrict : 'E',
		scope : {
			show : '='
		},
		replace : true, // Replace with the template below
		link : function(scope, element, attrs) {
			scope.dialogStyle = {};
			if (attrs.width)
				scope.dialogStyle.width = attrs.width;
			if (attrs.height)
				scope.dialogStyle.height = attrs.height;
			scope.hideModal = function() {
				scope.show = false;
			};
		},
		templateUrl : 'warning-dialog.html' // See below
	};
});
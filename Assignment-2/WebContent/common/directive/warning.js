/**
 * 
 */
buddyListApp.directive('warning', function() {
	return {
		restrict : 'E',
		scope : {
			topic : '=title',
			description : '=message',
			ok : '&ok',
			cancel : '&cancel'
		},
		templateUrl : "warning-dialog.html",
		replace : true
	};
});
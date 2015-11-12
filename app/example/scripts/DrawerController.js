angular
  .module('example')
  .controller('DrawerController', function($scope, supersonic) {
	$scope.changeList = function(listID) {
		supersonic.data.channel('changeList').publish(listID);
		$scope.selectedID = listID;
		supersonic.ui.drawers.close();
		
	};
  });
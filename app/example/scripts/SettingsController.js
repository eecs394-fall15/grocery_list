angular
  .module('example')
  .controller('SettingsController', function($scope, supersonic) {
    $scope.changeList = function(listID) {
		supersonic.data.channel('changeList').publish(listID);
	};
  });

angular
.module('example')
.controller('LoginController', function($scope, supersonic) {

	$scope.name = "";
	$scope.email = "";

	$scope.forward=function()
	{

		var options = {
		  animate: true
		}

		supersonic.ui.modal.hide(options);


	}





  });



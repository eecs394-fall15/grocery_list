angular
.module('example')
.controller('LoginController', function($scope, supersonic) {


$scope.forward=function()
{

	var options = {
	  animate: false
	}

	supersonic.ui.modal.hide(options);


}





  });



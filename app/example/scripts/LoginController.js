angular
.module('example')
.controller('LoginController', function($scope, supersonic) {

	$scope.name = "";
	$scope.email = "";

	$scope.forward=function()
	{
		var loginName = $scope.name;
		var loginEmail = $scope.email;

		localStorage.setItem("loginName", loginName);
		localStorage.setItem("loginEmail", loginEmail);

		var options = {
		  animate: true
		}

		supersonic.ui.modal.hide(options);


	}





  });



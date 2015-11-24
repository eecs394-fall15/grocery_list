angular
.module('example')
.controller('LoginController', function($scope, supersonic) {

	$scope.name = "";
	$scope.email = "";

	$scope.forward=function()
	{
		var loginName = $scope.name.toString();
		var loginEmail = $scope.email.toString();

		localStorage.setItem("loginName", loginName);
		localStorage.setItem("loginEmail", loginEmail);

		var loginClass = Parse.Object.extend("LoginData");

		var loginObject = new loginClass();
		loginObject.set("username", loginName);
		loginObject.set("email", loginEmail);

		loginObject.save();

		var options = {
		  animate: true
		}

		supersonic.ui.modal.hide(options);
	}
  });



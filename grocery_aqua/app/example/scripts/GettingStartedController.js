angular
  .module('example')
  .controller('GettingStartedController', function($scope, supersonic) {
    $scope.navbarTitle = "Groceries";
    var items = [
      { 
        name: 'Bananas',
        quantity: 6
      },
      {
        name: 'Apples',
        quantity: '3'
      }
  	];
  	$scope.formData = {};
  	$scope.formData.items = items; 
  });
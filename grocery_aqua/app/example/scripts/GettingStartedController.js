angular
  .module('example')
  .controller('GettingStartedController', function($scope, supersonic) {
    $scope.navbarTitle = "Groceries";
    var items = [
      { 
        id: 0,
        name: 'Bananas',
        quantity: 6
      },
      {
        id: 1,
        name: 'Apples',
        quantity: '3'
      }
  	];
  	$scope.formData = {};
  	$scope.formData.items = items; 
    $scope.delete = function(id)
    {
      supersonic.logger.log("delete clicked, id = " + id); 
      $("#" + id).css("color", "red"); 

    }  
  });
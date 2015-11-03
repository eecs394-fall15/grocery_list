angular
  .module('example')
  .controller('GettingStartedController', function($scope, supersonic) {
    $scope.navbarTitle = "Groceries";
    $scope.groceryItems = [
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

    $scope.delete = function(id)
    {
      supersonic.logger.log("delete clicked, id = " + id);
      $("#" + id).css("color", "red");

    }
    supersonic.data.channel('addListItem').subscribe(function(newItem) {
      $scope.groceryItems.push(newItem);
      $scope.$apply();
    });
  });
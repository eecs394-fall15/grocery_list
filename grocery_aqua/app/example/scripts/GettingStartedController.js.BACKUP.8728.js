angular
  .module('example')
  .controller('GettingStartedController', function($scope, supersonic) {
    $scope.navbarTitle = "Groceries";
<<<<<<< HEAD
    $scope.deleteButtonVisible = false;
    var items = [
      { 
=======
    $scope.groceryItems = [
      {
>>>>>>> origin/master
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
<<<<<<< HEAD
      supersonic.logger.log("delete clicked, id = " + id); 
      deleteButtonVisible = true;
=======
      supersonic.logger.log("delete clicked, id = " + id);
      $("#" + id).css("color", "red");
>>>>>>> origin/master

    }
    supersonic.data.channel('addListItem').subscribe(function(newItem) {
      $scope.groceryItems.push(newItem);
      $scope.$apply();
    });
  });
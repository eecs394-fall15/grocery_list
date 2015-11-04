angular
  .module('example')
  .controller('GettingStartedController', function($scope, supersonic) {
    $scope.navbarTitle = "Groceries";
    $scope.swipeID = -1;
    $scope.isSwipeID = function(id) {
      if (swipeID == id) {
        return true;
      }
      return false;
    }
    $scope.state = "NORMAL";
    $scope.groceryItems = [
      {
        id: 0,
        name: 'Bananas',
        quantity: 6,
        onList: true
      },
      {
        id: 1,
        name: 'Apples',
        quantity: '3',
        onList: true
      },
      {
        id: 2,
        name: 'Oranges',
        quantity: '3',
        onList:false
      }
  	];

    $scope.delete = function(id) {

      supersonic.logger.log("delete clicked, id = " + id); 
      
      for (var i = 0; i < $scope.groceryItems.length; i++) {
        if ($scope.groceryItems[i].id == id) {
          $scope.groceryItems.splice(i, 1);
        }
      }
      swipeID = -1;

    }

    $scope.open = function(id) {

      supersonic.logger.log("delete clicked, id = " + id); 
      
      for (var i = 0; i < $scope.groceryItems.length; i++) {
        if ($scope.groceryItems[i].id == id) {
          $scope.groceryItems[i].onList = true;
        }
      }
      swipeID = -1;

    }
    $scope.close = function(id) {

      supersonic.logger.log("delete clicked, id = " + id); 
      
      for (var i = 0; i < $scope.groceryItems.length; i++) {
        if ($scope.groceryItems[i].id == id) {
          $scope.groceryItems[i].onList = false;
        }
      }
      swipeID = -1;

    }



    $scope.postpone = function(id) {
      supersonic.logger.log("postpone clicked, id = " + id); 
      swipeID = -1;

    }
    $scope.swipeLeft = function(id) {
      state = "DELETE";
      supersonic.logger.log("swiped left, id = " + id); 
      swipeID = id;

    }
    $scope.swipeRight = function(id) {
      state = "POSTPONE";
      supersonic.logger.log("swiped right, id = " + id); 
      swipeID = id;
    }
    supersonic.data.channel('addListItem').subscribe(function(newItem) {
      $scope.groceryItems.push(newItem);
      $scope.$apply();
    });
  });
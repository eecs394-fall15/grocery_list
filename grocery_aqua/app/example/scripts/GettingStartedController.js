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
        unit: 'unit(s)',
        onList: true
      },
      {
        id: 1,
        name: 'Apples',
        quantity: '3',
        unit: 'unit(s)',
        onList: true
      },
      {
        id: 2,
        name: 'Oranges',
        quantity: '3',
        unit: 'unit(s)',
        onList:true      
      },
      {
        id: 3,
        name: 'Mac-N-Cheese',
        quantity: '3',
        unit: 'unit(s)',
        onList:false      
      },
      {
        id: 4,
        name: 'Soccerball',
        quantity: '1',
        unit: 'unit(s)',
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
      var name = "";
      for (var i = 0; i < $scope.groceryItems.length; i++) {
        if ($scope.groceryItems[i].id == id) {
          $scope.groceryItems[i].onList = true;
          name = $scope.groceryItems[i].name;
        }
      }
      swipeID = -1;

      var instructions = {
                message: name,
                buttonLabel: "Ok"
            };

            supersonic.ui.dialog.alert("Item added:", instructions).then(function() {

            });

    }
    $scope.close = function(id) {

      supersonic.logger.log("delete clicked, id = " + id); 
      
      var name = "";
      for (var i = 0; i < $scope.groceryItems.length; i++) {
        if ($scope.groceryItems[i].id == id) {
          $scope.groceryItems[i].onList = false;
          name = $scope.groceryItems[i].name;
        }
      }
      swipeID = -1;

      var instructions = {
                message: name,
                buttonLabel: "Ok"
            };

      supersonic.ui.dialog.alert("Item removed:", instructions).then(function() {});

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
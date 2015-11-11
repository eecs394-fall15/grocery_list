angular
  .module('example')
  .controller('GettingStartedController', function($scope, supersonic) {
  $scope.resultImages = [];
$scope.resultImages1 = [];



$scope.current= function() {
    var imageClass= Parse.Object.extend("ImageData");
    var imgQuery = new Parse.Query(imageClass);
    imgQuery.equalTo("item_status","O")

      imgQuery.find({
      success: function(results) {
          
        // supersonic.ui.dialog.alert(results.length);
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
 
          var object = results[i];
          var newImage = {};
          newImage.name = object.get("item_name");

          newImage.quantity = object.get("item_quantity");
          newImage.unit = object.get("item_unit");
          newImage.info = object.get("item_info");
         newImage.id = object.id;
       supersonic.logger.log(newImage.id);
          var image = object.get("itemImage");
          newImage.photo = image.url();
        
          $scope.resultImages.push(newImage);
         
        }
      },
      error: function(error) {
        supersonic.ui.dialog.alert('Not Working!!');
      }
    });
    }


$scope.previous= function() {

    var prevClass= Parse.Object.extend("ImageData");
    var prevQuery = new Parse.Query(prevClass);
    prevQuery.equalTo("item_status","P")

      prevQuery.find({
      success: function(results1) {
          
        // supersonic.ui.dialog.alert(results.length);
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results1.length; i++) {
 
          var object = results1[i];
          var newImage1 = {};
          newImage1.name = object.get("item_name");

          newImage1.quantity = object.get("item_quantity");
          newImage1.unit = object.get("item_unit");
          newImage1.info = object.get("item_info");
         newImage1.id = object.id;
       supersonic.logger.log(newImage1.id);
          var image = object.get("itemImage");
          newImage1.photo = image.url();
          $scope.resultImages1.push(newImage1);
          supersonic.logger.log($scope.resultImages1[i]);
         
        }
      },
      error: function(error) {
        supersonic.ui.dialog.alert('Not Working!!');
      }
    });
    }


     $scope.navbarTitle = "Groceries";
    $scope.swipeID = -1;
    $scope.isSwipeID = function(id) {
      if (swipeID == id) {
        return true;
      }
      return false;
    }
    $scope.state = "NORMAL";

    $scope.current();
       $scope.previous();
    /*$scope.groceryItems = [
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
        onList:false      }
  	];
*/
    $scope.delete = function(id) {

      supersonic.logger.log("delete clicked, id = " + id); 
      

    }

    $scope.open = function(itemID) {

    var  UpdateClass= Parse.Object.extend("ImageData");
            var status="O";
   var updateQuery = new UpdateClass();
   updateQuery.id=itemID;
   updateQuery.set("item_status",status);
   updateQuery.save(null,{
      success: function(updateQuery) {

supersonic.logger.log("saved successfully");
          
 
      },
      error: function(updateQuery,error) {
        supersonic.ui.dialog.alert('Not Working!!');
      }
    });

  $scope.current();

    }



    $scope.close = function(itemID) {

    var  UpdateClass= Parse.Object.extend("ImageData");
            var status="P";
   var updateQuery = new UpdateClass();
   updateQuery.id=itemID;
   updateQuery.set("item_status",status);
   updateQuery.save(null,{
      success: function(updateQuery) {

supersonic.logger.log("saved successfully");
          
 
      },
      error: function(updateQuery,error) {
        supersonic.ui.dialog.alert('Not Working!!');
      }
    });

 

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
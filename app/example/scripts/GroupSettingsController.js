angular
.module('example')
.controller('GroupSettingsController', function($scope, supersonic) {


  $scope.listNames = ["Grocery List","Christmas List","Office"];
  $scope.currentListID = 1;
  $scope.header = $scope.listNames[$scope.currentListID-1];

  $scope.state = "NORMAL";


  $scope.current= function() {
    supersonic.logger.log("inside current");
    $scope.resultImages = [];
    var imageClass= Parse.Object.extend("User_Details");
    var imgQuery = new Parse.Query(imageClass);
    imgQuery.equalTo("Group_ID",$scope.currentListID);
    imgQuery.find({
      success: function(results) {

      supersonic.logger.log(results.length);
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {

          var object = results[i];
          var newImage = {};

          var status ="";

          newImage.name = object.get("User_Name");

          newImage.email = object.get("email");
          
          newImage.id = object.id;
        
          var image = object.get("member_image");
          newImage.photo = image.url();

          $scope.resultImages.push(newImage);

        }
        $scope.$apply();
      },
      error: function(error) {
        supersonic.ui.dialog.alert('Not Working!!');
      }
    });
  };

  $scope.showInfo = function(item) {
    var options = {
      message: "Quantity: " + item.quantity +  "\nUnit: " + item.unit +  "\nInfo: " + item.info,
      buttonLabel: "Close"
    };

    supersonic.ui.dialog.alert(item.name, options).then(function() {
      supersonic.logger.log("Alert closed.");
    });
  };


  $scope.previous= function() {
    $scope.resultImages1 = [];
    var prevClass= Parse.Object.extend("LoginData");
    var prevQuery = new Parse.Query(prevClass);
    prevQuery.find({
      success: function(results1) {

        // supersonic.ui.dialog.alert(results.length);
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results1.length; i++) {

          var object = results1[i];
          var newImage1 = {};
          newImage1.name = object.get("username");

          newImage1.email = object.get("email");
          newImage1.id = object.id;
         

          var image = object.get("userImage");
          newImage1.photo = image.url();
          $scope.resultImages1.push(newImage1);


        }
        $scope.$apply();
      },
      error: function(error) {
        supersonic.ui.dialog.alert('Not Working!!');
      }
    });
  };

  $scope.refreshData = function(){
    $scope.current();
    $scope.previous();
  };

  $scope.refreshData();



  $scope.delete = function(id) {

    supersonic.logger.log("delete clicked, id = " + id);


  };

  $scope.open = function(itemID) {

    var  UpdateClass= Parse.Object.extend("ImageData");
    supersonic.logger.log("here");
    var status="O";
    var updateQuery = new UpdateClass();
    updateQuery.id=itemID;
    updateQuery.set("item_status",status);
    updateQuery.save(null,{
      success: function(updateQuery) {

        supersonic.logger.log("saved successfully");
        $scope.refreshData();
      },
      error: function(updateQuery,error) {
        supersonic.ui.dialog.alert('Not Working!!');
      }
    });


  };



  $scope.close = function(itemID) {

    var  UpdateClass= Parse.Object.extend("ImageData");
    var status="P";
    var updateQuery = new UpdateClass();
    updateQuery.id=itemID;
    updateQuery.set("item_status",status);
    updateQuery.save(null,{
      success: function(updateQuery) {
        $scope.refreshData();


      },
      error: function(updateQuery,error) {
        supersonic.ui.dialog.alert('Not Working!!');
      }
    });



  };

  $scope.postpone = function(id) {
    supersonic.logger.log("postpone clicked, id = " + id);
    swipeID = -1;

  };
  $scope.swipeLeft = function(id) {
    state = "DELETE";
    supersonic.logger.log("swiped left, id = " + id);
    swipeID = id;

  };
  $scope.swipeRight = function(id) {
    state = "POSTPONE";
    supersonic.logger.log("swiped right, id = " + id);
    swipeID = id;
  };
  supersonic.data.channel('addListItem').subscribe(function(newItem) {
    $scope.groceryItems.push(newItem);
    $scope.$apply();
  });

    //The function that is called when the list is changed in the sidebar
    supersonic.data.channel('changeList').subscribe(function(g){
      $scope.currentListID = g.id;
   
      $scope.navTitle = g.name;
      
      $scope.header = $scope.listNames[$scope.currentListID-1];
      $scope.$apply();
      $scope.refreshData();
    
    });

    supersonic.data.channel('refreshData').subscribe(function(bool){
      $scope.refreshData();
    });

    $scope.openSidebar = function(){
     supersonic.ui.drawers.open('left');
   };

     $scope.commit = function(id) {

      var imageClass = Parse.Object.extend("ImageData");
      var imgQuery = new Parse.Query(imageClass);
      imgQuery.equalTo("objectId", id);
      imgQuery.first({
        success: function(object) {

          object.set("item_status", "C");
          object.save();
          $scope.current();

        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });


  };

 });
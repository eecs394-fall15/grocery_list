angular
.module('example')
.controller('InitialViewController', function($scope, supersonic,$location, $anchorScroll) {

  $scope.abc = function() {
    supersonic.logger.log("abc");
  }

  $scope.submitImageTwo = function(groceryItem) {
    supersonic.logger.log("absdhfasdf");
    supersonic.ui.dialog.alert('Sorry, there was a problem.' + error.message);
  };

  $scope.custom=true;
  $scope.submittingImage = false;
  var cameraOptions = {
    destinationType: "dataURL",
    quality: 40,
  };
  supersonic.ui.tabs.whenDidChange(function()
  {
    $scope.isOpen = true;
    $scope.custom= true;
  });
  $scope.isOpen = true;
  var stopListening  = supersonic.ui.views.current.whenVisible(function(){
    if($scope.isOpen)
      {supersonic.media.camera.takePicture(cameraOptions).then( function(result){

        $scope.image = result;
        $scope.defaultImage = false;

      });
  }
            //stopListening();
            $scope.isOpen = false;
          });


        // var cameraDataURL = "http://localhost/images/camera.jpg";
       // var defaultDataURL = "http://localhost/images/default.jpg";

       $scope.groceryItem = { onList : true};
       $scope.image="/placeholder.png";
       $scope.defaultImage = true;
       $scope.takePicture = function(input_type) {

       };

       $scope.toggleCustom = function() {
        $scope.custom = $scope.custom === false ? true: false;


        // call $anchorScroll()
        if($scope.custom)
        {
         $location.hash('bottom');
         $anchorScroll();
       } else 
       {

         $location.hash('top');
         $anchorScroll();
       }
     };


    $scope.currentListID = 1;
    supersonic.data.channel('changeList').subscribe(function(g){
      $scope.currentListID = g.id;
      supersonic.logger.log('Now display list ' + g.id);
    });
  $scope.submitImage = function(groceryItem) {
    supersonic.logger.log("this is working");
    supersonic.ui.dialog.alert('Sorry, there was a problem.' + error.message);
      $scope.submittingImage = true;
      supersonic.logger.log("inside submit");
      var  ImageClass= Parse.Object.extend("LoginData");
      var img = new ImageClass();

      var status="O";
      img.set("item_name", groceryItem.name);

img.set("item_quantity", groceryItem.quantity);
img.set("item_info", groceryItem.info);
img.set("item_status", status);
img.set("list_id", $scope.currentListID);

 img.save(null, {
  success: function(Img) {
          // Execute any logic that should take place after the object is saved.
          $scope.submittingImage = false;
          var image = document.getElementById('showImage');
          image.src = "/placeholder.png";
          var item_name = document.getElementById('item_name');
          item_name.value ="";
          var item_quantity = document.getElementById('item_quantity');
          item_quantity.value = 0;
          var item_info = document.getElementById('item_info');
          item_info.value ="";
          supersonic.ui.dialog.alert('Submitted Successfully!').then(function(){
            supersonic.data.channel('refreshData').publish(true);
            supersonic.ui.tabs.select(0);
          });
        },
        error: function(Img, error) {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          supersonic.ui.dialog.alert('Sorry, there was a problem.' + error.message);
        }

      });
}, function(error) {
  supersonic.logger.log(error.message);
});
//supersonic.logger.log(file);

};


});

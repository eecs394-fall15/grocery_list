angular
.module('example')
.controller('UpdateController', function($scope, supersonic,$location, $anchorScroll) {

  $scope.custom=true;
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
    supersonic.data.channel('changeList').subscribe(function(listID){
      $scope.currentListID = listID;
      supersonic.logger.log('Now display list ' + listID);
    });
     $scope.submitImage = function(groceryItem) {
      supersonic.logger.log("inside submit");
      var  ImageClass= Parse.Object.extend("ImageData");
      var img = new ImageClass();

      var status="O";
      img.set("item_name", groceryItem.name);
/*if(groceryItem.quantity.toString()=="")
{
   groceryItem.quantity=0;
 }*/
//supersonic.logger.log("grocery"+grocery.quantity.toString());
img.set("item_quantity", groceryItem.quantity);
img.set("item_info", groceryItem.info);
img.set("item_status", status);
img.set("list_id", $scope.currentListID);
var file = new Parse.File("item_image.png", { base64: $scope.image });

file.save().then(function(result) {
 supersonic.logger.log("inside file save:");
 img.set('itemImage', file);

 img.save(null, {
  success: function(Img) {
          // Execute any logic that should take place after the object is saved.
          supersonic.ui.dialog.alert('Submitted Successfully!');
          var image = document.getElementById('showImage');
          image.src = "/placeholder.png";
          var item_name = document.getElementById('item_name');
          item_name.value ="";
          var item_quantity = document.getElementById('item_quantity');
          item_quantity.value = 0;
          var item_info = document.getElementById('item_info');
          item_info.value ="";
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

}


});

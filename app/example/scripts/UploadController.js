angular
    .module('example')
    .controller('UpdateController', function($scope, supersonic) {
        var cameraOptions = {
            destinationType: "dataURL",
            quality: 40,
        };
        supersonic.ui.tabs.whenDidChange(function()
        {
            $scope.isOpen = true;
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

          // var stopListening = supersonic.ui.views.current.whenHidden(function()
          // {
          //   stopListening();
          // });
        // var cameraDataURL = "http://localhost/images/camera.jpg";
       // var defaultDataURL = "http://localhost/images/default.jpg";

        $scope.groceryItem = { onList : true}; 
        $scope.image="/placeholder.png";
        $scope.defaultImage = true;
        $scope.takePicture = function(input_type) {

        supersonic.logger.log(input_type);
            if(input_type==1)
            {
          
        }


        };
       

        $scope.submitItem = function()  {

            // var image = document.getElementById('showImage');
            // image.src ="/placeholder.png"
            supersonic.data.channel('addListItem').publish($scope.groceryItem);
            var instructions = {
                message: "Item Submitted!",
                buttonLabel: "Done!"
            };
            var image = document.getElementById('showImage');
            image.src = "/placeholder.png";
            var item_name = document.getElementById('item_name');
            item_name.value ="";
            var item_quantity = document.getElementById('item_quantity');
            item_quantity.value = 0;
            var item_unit = document.getElementById('item_unit');
            item_unit.value ="";
            var item_info = document.getElementById('item_info');
            item_info.value ="";



            supersonic.ui.dialog.alert("Success", instructions).then(function() {

            });
        };

$scope.currentListID;
supersonic.data.channel('changeList').subscribe(function(listID){
      $scope.currentListID = listID;
      $scope.current();
      $scope.previous();
      supersonic.logger.log('Now display list ' + listID);
    });
$scope.submitImage = function(groceryItem) {

var  ImageClass= Parse.Object.extend("ImageData");
            var img = new ImageClass();
            var file = new Parse.File("item_image.png", { base64: $scope.image });

var status="O";
img.set("item_name", groceryItem.name);
      img.set("item_quantity", groceryItem.quantity);
      img.set("item_unit", groceryItem.unit);
      img.set("item_info", groceryItem.info);
    img.set("item_status", status);
    img.set("list_id", $scope.currentListID)
       file.save().then(function() {
       
       
      }, function(error) {
    
      });

       img.set('itemImage', file);

         img.save(null, {
        success: function(Img) {
          // Execute any logic that should take place after the object is saved.
          supersonic.ui.dialog.alert('Submitted Successfully!');
        },
        error: function(Img, error) {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          supersonic.ui.dialog.alert('Sorry, there was a problem.');
        }

      });


 
}


    });

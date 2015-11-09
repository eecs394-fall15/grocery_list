angular
    .module('example')
    .controller('UpdateController', function($scope, supersonic) {
        var cameraOptions = {
            destinationType: "dataURL",
            quality: 40,
        };
        // var cameraDataURL = "http://localhost/images/camera.jpg";
       // var defaultDataURL = "http://localhost/images/default.jpg";

        $scope.groceryItem = {onList: true}; 
        $scope.image="/placeholder.png";
        $scope.defaultImage = true;

        $scope.takePicture = function(input_type) {

supersonic.logger.log(input_type);
            if(input_type==1)
            {
                supersonic.logger.log("inside camera");
            supersonic.media.camera.takePicture(cameraOptions).then( function(result){
                //save image dataURL into dataURL
                //change the image on the new.html to the one taken
                $scope.image = result;
                 $scope.defaultImage = false;
               
            });
        }
        if(input_type==2)

        {
              supersonic.logger.log("inside photo library");

   supersonic.media.camera.getFromPhotoLibrary(cameraOptions).then( function(result){

                 $scope.image = result;
                  $scope.defaultImage = false;
            });

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


    });

angular
    .module('example')
    .controller('UpdateController', function($scope, supersonic) {
        var cameraOptions = {
            destinationType: "dataURL",
            quality: 40,
        };

        $scope.groceryItem = {onList: true};

        $scope.takePicture = function() {
            supersonic.media.camera.takePicture(cameraOptions).then( function(result){
                //save image dataURL into dataURL
                //change the image on the new.html to the one taken
                var image = document.getElementById('showImage');
                image.src = "data:image/jpeg;base64," + result;
            });


        };
        $scope.takePicture1 = function() {
            supersonic.logger.log("inside loop");
            supersonic.media.camera.getFromPhotoLibrary(cameraOptions).then( function(result1){

                var image = document.getElementById('showImage');
                image.src = "data:image/jpeg;base64," + result1;
            });
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

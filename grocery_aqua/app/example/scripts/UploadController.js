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

        $scope.submitImage = function(groceryItem) {

        var  ImageClass= Parse.Object.extend("ImageData");
                    var img = new ImageClass();
                    var file = new Parse.File("item_image.png", { base64: $scope.image });


        img.set("item_name", groceryItem.name);
              img.set("item_quantity", groceryItem.quantity);
              img.set("item_unit", groceryItem.unit);
              img.set("item_info", groceryItem.info);

               file.save().then(function() {


              }, function(error) {

              });

               img.set('itemImage', file);

                 img.save(null, {
                success: function(Img) {
                  // Execute any logic that should take place after the object is saved.
                  supersonic.ui.dialog.alert('Uploaded photo!');
                },
                error: function(Img, error) {
                  // Execute any logic that should take place if the save fails.
                  // error is a Parse.Error with an error code and message.
                  supersonic.ui.dialog.alert('Sorry, there was a problem.');
                }

              });



        };



    });

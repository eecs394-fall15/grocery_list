angular
    .module('example')
    .controller('UpdateController', function($scope, supersonic) {
        var cameraOptions = {
            destinationType: "dataURL",
            quality: 40,

            saveToPhotoAlbum: true
        };

        $scope.takePicture = function() {
            supersonic.media.camera.takePicture(cameraOptions).then( function(result){
                //save image dataURL into dataURL
                //change the image on the new.html to the one taken
                var image = document.getElementById('showImage');
                image.src = "data:image/jpeg;base64," + result;
            })


        };




        $scope.takePicture1 = function() {
            supersonic.logger.log("inside loop");
            supersonic.media.camera.getFromPhotoLibrary(cameraOptions).then( function(result1){
             
                var image = document.getElementById('showImage');
                image.src = "data:image/jpeg;base64," + result1;
            })
        };


    });

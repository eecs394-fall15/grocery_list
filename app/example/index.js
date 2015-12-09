angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'supersonic', 'ngTouch'
])
.run(function()
{

Parse.initialize("8paQXR5VZzsqmv8hWT2LjiWORkaFPfxJuUUDNttG", "j7BDqzBA3gxHAgRYCGvfKkNPmPlwDIie6WZX86U7");
    
})


.service('ConnectParseService',[ 'supersonic',  '$q', function(supersonic, $q) {
  var currentListID =1;
  supersonic.data.channel('changeList').subscribe(function(g){
    currentListID = g.id; 
    });

  this.find = function() {
    var resultImages = [];
 
  
    var defer = $q.defer();

    var imageClass= Parse.Object.extend("ImageData");
    var imgQuery = new Parse.Query(imageClass);
    imgQuery.containedIn("item_status",["O", "C"]);
    // supersonic,logger.log("working");
    // supersonic.logger.log("currentListID");

   
    
    imgQuery.equalTo("list_id",currentListID);
    imgQuery.descending("createdAt");
    imgQuery.find({
      success: function(results) {
         defer.resolve(results);
      },
      error: function(error) {
     
         defer.reject();
      }
    });
    return defer.promise;
  };
}]);







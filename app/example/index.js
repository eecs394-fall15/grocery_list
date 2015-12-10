angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'supersonic'
])
.run(function($rootScope){

Parse.initialize("8paQXR5VZzsqmv8hWT2LjiWORkaFPfxJuUUDNttG", "j7BDqzBA3gxHAgRYCGvfKkNPmPlwDIie6WZX86U7");
    
})
.service('ConnectParseService', ['supersonic',  '$q', function(supersonic, $q) {
   
  this.find = function(id) {
    var imageClass= Parse.Object.extend("User_Details");
    var imgQuery = new Parse.Query(imageClass);
    var resultImages = [];
    var defer = $q.defer();

    // supersonic,logger.log("working");
    // supersonic.logger.log("currentListID");
    
    imgQuery.equalTo("Group_ID",id);

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
  
  this.save = function(username, email, id)
  { 
   var deferring = $q.defer();
   var imageClass1 = Parse.Object.extend("User_Details");
   var imgQuery1 = new imageClass1();
    imgQuery1.set("User_Name",username);
    imgQuery1.set("email",email);
    imgQuery1.set("Group_ID", parseInt(id,10));
    imgQuery1.save(null,
    {
      success : function(results)
      {
        //supersonic.ui.dialog.alert("sucess");
        deferring.resolve(results);
    },
    error: function(error)
    {
     // supersonic.ui.dialog.alert("error");
      deferring.reject(error);
    }

   });
      return deferring.promise;
  };


}]);







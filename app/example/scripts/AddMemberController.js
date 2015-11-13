	angular.
	module('example')
	.controller('AddMemberController', function($scope, supersonic, $compile){
		supersonic.logger.log("iside controller");
		$scope.groupArray=[];
		var groupClass = Parse.Object.extend("User_Details");
		var groupobj = new groupClass();
		var groupID=window.localStorage.getItem("group_id");
		var groupName=window.localStorage.getItem("group_name");
		
		$scope.open = function()
		{
	// var fields = ["*"];
 	 navigator.contacts.pickContact(pick_success, pick_fail);
    };
function pick_success(contact) {
	supersonic.logger.log("inside success");
	supersonic.logger.log(JSON.stringify(contact));
 $scope.groupArray.push({"givenname":contact.name.givenName,"phone":contact.phoneNumbers[0].value}) ;
 $scope.$apply();
 var view = new supersonic.ui.View({
  location: "example#add_member"
});

supersonic.ui.views.start(view);
}
function pick_fail(err){
    supersonic.logger.log('Error: ' + err);
}

$scope.submitmembers = function()
{

angular.forEach($scope.groupArray,function(item)
{
groupobj.set("User_Name",item.givenname);
groupobj.set("Phone_Number",item.phone);
groupobj.set("Group_ID",groupID);
groupobj.set("Group_Name",groupName);

		groupobj.save(null,{
				success: function(results) {
                


				},
				error: function(results,error) {
				
				}
			});

});

};

});




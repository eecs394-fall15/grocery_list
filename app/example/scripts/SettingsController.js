angular
.module('example')
.controller('SettingsController', function($scope, supersonic) {
	$scope.changeList = function(listID) {
		supersonic.data.channel('changeList').publish(listID);
	};

	$scope.groups = [];

	var phoneNumber =  "610-350-7894";

	//Pull all group IDs from User Details with Phone number in row
	var groupID;

	var userDetails = Parse.Object.extend("User_Details");
	var groupDetails = Parse.Object.extend("Group_Details");

	var userDetailsQuery= new Parse.Query(userDetails);

	$scope.groups = [];



	userDetailsQuery.equalTo("Phone_Number", phoneNumber);
	userDetailsQuery.find({
		success: function(people){
			for (var i = 0; i < people.length; i++){
				var object = people[i];
				var newGroup = {};
				newGroup.ID = object.get("Group_ID");
				newGroup.group_name = object.get("Group_Name");
				$scope.groups.push(newGroup);
			}

			// groupDetailsQuery.containedIn("group_ID", $scope.groupIDs);
			// groupDetailsQuery.find({
			// 	success: function(group){
			// 		for (var i = 0; i < group.length; i++){
			// 			var object = group[i];
			// 			$scope.groupsNames.push(object.get("group_name"));

			// }
			// 	},
			// 	error: function(error) {
			// 		supersonic.ui.dialog.alert('Not Working!!');
			// 	}
			// });
		},
		error: function(error) {
			supersonic.ui.dialog.alert('Not Working!!');
		},
	});

	$scope.openSettings = function(id) {

		// var modalView = new supersonic.ui.View("example#team-settings");
		// var options = {
		// 	animate: true
		// };
		// supersonic.ui.layers.push(modalView, options);
		
		var groupDetails = Parse.Object.extend("Group_Details");
		var groupDetailsQuery = new Parse.Query(groupDetails);
		groupDetailsQuery.equalTo("group_ID",id);

		//Find all group details
		$scope.group;
		groupDetailsQuery.find({
			success: function(groups){
				for (var i = 0; i < people.length; i++){
					var object = people[i];
					var newGroup = {};
					newGroup.ID = object.get("group_ID");
					newGroup.group_name = object.get("group_name");

					$scope.groups = newGroup;
				}
			},
			error: function(error) {
				supersonic.ui.dialog.alert('Not Working!!');
			},

		});



		//Find all people details
	}

$scope.forward=function()
{

var modalView = new supersonic.ui.View("example#addgroup");
var options = {
  animate: true
}

supersonic.ui.modal.show(modalView, options);


}





  });



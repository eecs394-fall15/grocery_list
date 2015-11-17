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

	supersonic.data.channel('peopleFromList').subscribe( function(message) {

		userDetailsQuery.equalTo("Group_ID", message);
		userDetailsQuery.find({
			success: function(people){
				for (var i = 0; i < people.length; i++){
					var object = people[i];
					var newGroup = {};
					newGroup.ID = object.get("Group_ID");
					newGroup.group_name = object.get("User_Name");
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
		$scope.$apply();
	});

});



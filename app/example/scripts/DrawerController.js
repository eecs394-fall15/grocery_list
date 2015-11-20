angular
  .module('example')
  .controller('DrawerController', function($scope, supersonic) {
  	$scope.items = [];

  	$scope.groups = [];

	var groupID;

	var groupDetails = Parse.Object.extend("Group_Details");

	var groupDetailsQuery= new Parse.Query(groupDetails);

	$scope.groups = [];



	groupDetailsQuery.find({
		success: function(people){
			for (var i = 0; i < people.length; i++){
				var object = people[i];
				var newGroup = {};
				newGroup.id = object.get("group_ID");
				newGroup.name = object.get("group_name");
				$scope.groups.push(newGroup);
			}
			$scope.$apply();

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

	$scope.changeList = function(group) {
			
		supersonic.data.channel('changeList').publish(group);
	
		$scope.selectedID = group.id;

		supersonic.ui.drawers.close();
		
	};
  });
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
		},
		error: function(error) {
			supersonic.ui.dialog.alert('Not Working!!');
		},
	});

	$scope.changeList = function(group) {
		window.localStorage.setItem("group_id",group.id);
		window.localStorage.setItem("group_name",group.gname);

		supersonic.data.channel('changeList').publish(group);
		supersonic.ui.drawers.close();

	};

	$scope.addGroup = function()
	{
	supersonic.logger.log("inside add group");
	var modalView = new supersonic.ui.View("example#addgroup");
	var options = {
	  animate: true
	}
	supersonic.ui.drawers.close();
	supersonic.ui.modal.show(modalView, options);





	};
});
angular.
	module('example')
	.controller('AddMemberController', function($scope, supersonic, $compile){

	var currentUsers = window.localStorage.getItem('currentUsers');
	$scope.groupid = window.localStorage.getItem('gid');
	
	if(currentUsers === null){
		currentUsers = [];
	}

	$scope.findFriends= function() {
		$scope.resultImages1 = [];
		var prevClass= Parse.Object.extend("LoginData");
		var prevQuery = new Parse.Query(prevClass);
		// supersonic.logger.log(currentUsers);
		// prevQuery.notContainedIn("username", currentUsers);
		prevQuery.find({
			success: function(results1) {

			// supersonic.ui.dialog.alert(results.length);
			// Do something with the returned Parse.Object values
			for (var i = 0; i < results1.length; i++) {
				var object = results1[i];
				var newImage1 = {};
				newImage1.name = object.get("username");

				newImage1.email = object.get("email");
				newImage1.id = object.id;

				var image1 = object.get("userImage");
				if(image1===undefined) {
					newImage1.photo="/member.jpg";
				}
				else {
					newImage1.photo = image1.url();
				}


				$scope.resultImages1.push(newImage1);


			}
			$scope.$apply();
		},
		error: function(error) {
			supersonic.ui.dialog.alert('Not Working!!');
		}
		});
	};
	$scope.findFriends();

	$scope.addMember = function(username,email,groupid){
		
		var addedUser = {
			username: username,
			email: email,
			gid: groupid

		};
		supersonic.data.channel('addingUser').publish(addedUser);
	}
// 		supersonic.logger.log("iside controller");
// 		$scope.groupArray=[];
// 		var groupClass = Parse.Object.extend("User_Details");
// 		var groupobj = new groupClass();
// 		var groupID=window.localStorage.getItem("group_id");
// 		var groupName=window.localStorage.getItem("group_name");

// 		$scope.open = function()
// 		{
// 	// var fields = ["*"];
// 	navigator.contacts.pickContact(pick_success, pick_fail);
// };
// function pick_success(contact) {
// 	supersonic.logger.log("inside success");
// 	supersonic.logger.log(JSON.stringify(contact));
// 	$scope.groupArray.push({"givenname":contact.name.givenName,"phone":contact.phoneNumbers[0].value}) ;
// 	$scope.$apply();
// 	var view = new supersonic.ui.View({
// 		location: "example#add_member"
// 	});

// 	supersonic.ui.views.start(view);
// }
// function pick_fail(err){
// 	supersonic.logger.log('Error: ' + err);
// }

// $scope.submitmembers = function()
// {

// 	angular.forEach($scope.groupArray,function(item)
// 	{
// 		groupobj.set("User_Name",item.givenname);
// 		groupobj.set("Phone_Number",item.phone);
// 		groupobj.set("Group_ID",groupID);
// 		groupobj.set("Group_Name",groupName);

// 		groupobj.save(null,{
// 			success: function(results) {



// 			},
// 			error: function(results,error) {

// 			}
// 		});

// 		var modalView = new supersonic.ui.View("example#addgroup");
// 		var options = {
// 			animate: true
// 		};
// 		supersonic.ui.modal.hide();

// 	});

// };

});




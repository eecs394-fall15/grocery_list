	angular.
	module('example')
	.controller('AddGroupController', function($scope, supersonic, $compile){
		$scope.group = {};

		var groupClass = Parse.Object.extend("Group_Details");
		var memberClass = Parse.Object.extend("User_Details");
		var memObj = new memberClass();
		var groupobj = new groupClass();
		var groupNum = (Math.floor(Math.random() * 10000000)).toString();
        $scope.usernameRetrieve = localStorage.getItem("loginName");
        var uname=localStorage.getItem("loginName");
        var group_ID = parseInt(groupNum);
		$scope.create = function(group)
		{

			
			
			groupobj.set("group_name",group.gname);
			groupobj.set("group_ID",group_ID);
			window.localStorage.setItem("group_id",group_ID);
			window.localStorage.setItem("group_name",group.gname);
			groupobj.save(null,{
				success: function(results) {
					
			   memObj.set("User_Name",uname);
			   memObj.set("Group_ID",group_ID);
			   memObj.set("Group_Name",group.gname);

			   memObj.save(null,{

			   	success: function(results) {
supersonic.ui.dialog.alert('List Created Successfully!').then(function(){
            
	supersonic.ui.modal.hide();
          });

			   	},
error: function(results,error) {
					supersonic.ui.dialog.alert('Not Working!!');
				}

			   });



				},
				error: function(results,error) {
					supersonic.ui.dialog.alert('Not Working!!');
				}
			});



		};





		$scope.toHome = function()
		{
			var modalView = new supersonic.ui.View("example#getting-started");
			var options = {
				animate: true
			};
			supersonic.ui.modal.hide();
		};



	});
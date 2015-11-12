	angular.
	module('example')
	.controller('AddGroupController', function($scope, supersonic, $compile){
		$scope.group = {};

		var groupClass = Parse.Object.extend("Group_Details");
		var groupobj = new groupClass();
		var groupNum = (Math.floor(Math.random() * 10000000)).toString();

		$scope.create = function(group)
		{

			supersonic.logger.log("inside create");
			
				var group_ID = parseInt(groupNum);

		
supersonic.logger.log("inside create");
supersonic.logger.log(group.gname);
supersonic.logger.log(group.group_ID);
			groupobj.set("group_name",group.gname);
			groupobj.set("group_ID",group_ID);

			groupobj.save(null,{
				success: function(results) {
                var modalView = new supersonic.ui.View("example#add_member");
var options = {
  animate: true
}

supersonic.ui.modal.show(modalView, options);


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
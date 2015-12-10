describe('GroupSettingsControllerTest', function() {
  beforeEach(module('supersonic'));
  beforeEach(module('example'));

  var imgfinalMock;
  var $scope, rootScope, $timeout, deferred, deferring, q, $rootScope,createContr;
  var ConnectParseServiceMock;


  var ImgresultsMock = [{ get: function(field_name){ 
                        var newimageURL = {
                          url:function()
                          {
                            return "http://files.parseftss/image1";
                          }
                        }
                        if(field_name=="User_Name")return 'Sujana';
                        if(field_name=="email")return 'sujanaperumal2016@u.northwestern.edu';
                
                        if(field_name=="member_image")return newimageURL;
                       }},
                       { get: function(field_name){
                        var newimageURL = {
                         url:function()
                          {
                            return "http://files.parseftss/image2";
                          }
                        }
                        if(field_name=="User_Name")return 'Mike';
                        if(field_name=="email")return 'michaelburrough@gmail.com';
                        if(field_name=="member_image")return newimageURL;
                       }},
                       { 
                        get: function(field_name){
                        var newimageURL = {
                         url:function()
                          {
                            return "http://files.parseftss/image3";
                          }
                        }
                        if(field_name=="User_Name")return 'Neha';
                        if(field_name=="email")return '';
                        if(field_name=="member_image")return newimageURL;
                       }}
                       ];
                     
  beforeEach(function (){
    inject(function($rootScope, $controller, $q, _ConnectParseService_){
    q = $q;
    ConnectParseServiceMock = _ConnectParseService_;
    rootScope = $rootScope;
    $scope=$rootScope.$new();
   
  spyOn(ConnectParseServiceMock,'find').and.callFake(function() {
        deferred = $q.defer();
        return deferred.promise;
    });


  spyOn(ConnectParseServiceMock,'save').and.callFake(function(username,email,gid) {
        deferring = $q.defer();
        return deferring.promise;
    });
   
     createContr = function()
    { 
      return $controller('GroupSettingsController', {
      $scope: $scope,
      $rootScope: $rootScope,
      'ConnectParseService': ConnectParseServiceMock
      });
    }

 });
});


   describe('Get Group Members', function() {
    it('should Get Member Info in that group', function() {
   
    // not mocking group ids because its done using equal to in parse
      var controller =  createContr();
      deferred.resolve(ImgresultsMock);
      $scope.$digest();
      expect($scope.resultImages[0].name).toEqual('Sujana');
      expect($scope.resultImages[0].email).toEqual('sujanaperumal2016@u.northwestern.edu');
      expect($scope.resultImages[0].photo).toEqual("http://files.parseftss/image1");

      expect($scope.resultImages[1].name).toEqual('Mike');
      expect($scope.resultImages[1].email).toEqual('michaelburrough@gmail.com');
      expect($scope.resultImages[1].photo).toEqual("http://files.parseftss/image2");

      expect($scope.resultImages[2].name).toEqual('Neha');
      expect($scope.resultImages[2].email).toEqual('');
      expect($scope.resultImages[2].photo).toEqual("http://files.parseftss/image3");

    });
   
    it('Check if Member is added to group', function() {
   
   
      var controller =  createContr();
      $scope.addMember("sujana", "sujanaperumal2016@u.northwestern.edu", 1);
      deferring.resolve("member successfully added");
      $scope.$digest();

      expect($scope.message).toEqual('member successfully added');
      

    });

    it('Check if Member is not added to group', function() {
   
      var controller =  createContr();
      $scope.addMember("sujana", "sujanaperumal2016@u.northwestern.edu", "1");
      deferring.reject("member not successfully added");
      $scope.$digest();

      expect($scope.message).toEqual('member not successfully added');
      

    });

});
});
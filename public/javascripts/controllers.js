var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	
	var refresh = function() {
		$http.get('/contactlist').success(function(res) {
			console.log("I requested " + res);
				
			$scope.contactlist = res;
		});
	};
	
	refresh();
	
	$scope.addContact = function() {
		$http.post('/contactlist', $scope.contact).success(function(res) {
			refresh();
		});
	};
	
	$scope.remove = function(id) {
		$http.delete('/contactlist/' + id).success(function(res) {
			refresh();
		});
	};
	
	$scope.edit = function(id) {
		$http.get('/contactlist/' + id).success(function(res) {
			$scope.contact = res[0];
			console.log(res[0].name + ' ' + res[0].email + ' ' + res[0].number);
		});
	};
	
	$scope.update = function() {
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(res) {
			refresh();
		});
	};
}]);
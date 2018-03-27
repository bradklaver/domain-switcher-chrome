var app = angular.module('angOptions', []);


app.controller('ProjectsCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
	var data = localStorage['domainSwitcher'];

	if(data != null & data != '') {
		$scope.projects = JSON.parse(data);
	} else {
		$scope.projects = [];
	}

	$scope.addEnv = function(project) {
		project.envs.push({url: ''});
	};

	$scope.addProject = function(project) {
		$scope.projects.unshift({ name: '', editMode: true, envs: [ { url: '' }]});
	};

	$scope.removeProject = function($index) {
		$scope.projects.splice($index, 1);
	};

	$scope.save = function() {
		$scope.removeEmptyUrls();
		localStorage['domainSwitcher'] = JSON.stringify($scope.projects, function (key, val) {
			if (key == '$$hashKey') { // remove angular hash-keys to prevent collisions when loading from storage
				return undefined;
			}
			return val;
		});
		$('#save-success').fadeIn().delay(1000).fadeOut();
	};


	$scope.editName = function(project){
		project.editMode = true;
	};

	$scope.doneEditName = function(project){
		project.editMode = false;
	};

	$scope.removeEmptyUrls = function() {
		$scope.projects.forEach(function(project) {
			project.envs.forEach(function(env, index) {
				if(!env.url) {
					project.envs.splice(index, 1);
				}
			});
		});
	};


	$scope.importSettings = function() {
		if( $scope.importjson.length > 5 ){
	   localStorage["domainSwitcher"] = JSON.parse($scope.importjson).domainSwitcher;

	}


	}

	$scope.exportSettings = function() {

	    var result = JSON.stringify(localStorage);

	    // Save as file
	    var url = 'data:application/json;base64,' + btoa(result);
	    chrome.downloads.download({
	        url: url,
	        filename: 'filename_of_exported_file.json'
	    });

	}

}]);
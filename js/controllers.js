var app = angular.module('ShopperApp.Controllers', []);

app.controller('CarouselController', function($scope) {
	$scope.interval = 5000;
	var slides = $scope.slides = [
		{ id: 1, action: 'Get notified', image: 'img/1.jpg' },
		{ id: 2, action: 'Shop items', image: 'img/2.jpg' },
		{ id: 3, action: 'Deliver and get paid', image: 'img/3.jpg' },
	];
});

app.controller('ApplicantController', function($scope, $uibModal, APIService, SessionService) {
	$scope.applyNow = function () {
		var modalInstance = $uibModal.open({
	    	animation: true,
	      	templateUrl: 'partials/signup.html',
	      	controller: 'SignupModalInstanceController'
		});
	};
});

app.controller('SignupModalInstanceController', function($scope, $timeout, $uibModalInstance, APIService) {
	$scope.showMessage = false;
	$scope.callSuccess = true;

	$scope.createApplicant = function() {
		APIService.createApplicant(
			$scope.firstName, $scope.lastName, $scope.region,
			$scope.email, $scope.phone, $scope.phoneType, $scope.isOver21
		)
		.success(function(data, status, headers, config) {
			$scope.showMessage = true;
			$scope.callSuccess = true;

			$timeout(function() {
				$uibModalInstance.close();
			}, 2000);
		}).error(function(data, status) {
			$scope.showMessage = true;
			$scope.callSuccess = false;

			if (status === 409) {
				$scope.failureMessage = 'Shopper with this email already registered.'
			} else {
				$scope.failureMessage = 'Request failed. Please try again.'
			}
		});
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	}
});

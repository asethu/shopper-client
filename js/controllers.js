var app = angular.module('ShopperApp.Controllers', []);

app.controller('CarouselController', function($scope) {
	$scope.interval = 5000;
	var slides = $scope.slides = [
		{ id: 1, action: 'Get notified', image: 'img/1.jpg' },
		{ id: 2, action: 'Shop items', image: 'img/2.jpg' },
		{ id: 3, action: 'Deliver and get paid', image: 'img/3.jpg' },
	];
});

app.controller('ApplicantController', function($scope, $uibModal, APIService) {
	$scope.applyNow = function () {
		var modalInstance = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: 'partials/signup.html',
			controller: 'SignupModalInstanceController'
		});
	};

	$scope.searchApplicant = function () {
		var modalInstance = $uibModal.open({
			animation: true,
			backdrop: 'static',
			templateUrl: 'partials/search.html',
			controller: 'SearchModalInstanceController'
		});
	};
});

app.controller('SignupModalInstanceController', function($scope, $timeout, $uibModalInstance, APIService) {
	$scope.applicant = {};

	$scope.showMessage = false;
	$scope.callSuccess = false;

	$scope.createApplicant = function() {
		APIService.createApplicant(
			$scope.applicant.firstName, $scope.applicant.lastName, $scope.applicant.region,
			$scope.applicant.email, $scope.applicant.phone, $scope.applicant.phoneType, $scope.applicant.over21
		).success(function(data, status, headers, config) {
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

app.controller('SearchModalInstanceController', function($scope, $timeout, $uibModalInstance, APIService) {
	$scope.applicant = {};

	$scope.email = null;

	$scope.showMessage = false;
	$scope.searchSuccess = false;
	$scope.updateSuccess = false;

	$scope.searchApplicant = function() {
		APIService.getApplicant(
			$scope.email
		).success(function(data, status, headers, config) {
			$scope.applicant = data;

			$scope.searchSuccess = true;
		}).error(function(data, status) {
			$scope.showMessage = true;
			$scope.searchSuccess = false;

			if (status === 404) {
				$scope.failureMessage = 'Application with this email not found.'
			} else {
				$scope.failureMessage = 'Request failed. Please try again.'
			}
		});
	};

	$scope.updateApplicant = function() {
		APIService.updateApplicant(
			$scope.email, $scope.applicant.firstName, $scope.applicant.lastName,
			$scope.applicant.region, $scope.applicant.phone, $scope.applicant.phoneType, $scope.applicant.over21
		).success(function(data, status, headers, config) {
			$scope.showMessage = true;
			$scope.updateSuccess = true;

			$timeout(function() {
				$uibModalInstance.close();
			}, 2000);
		}).error(function(data, status) {
			$scope.showMessage = true;
			$scope.updateSuccess = false;

			$scope.failureMessage = 'Request failed. Please try again.'
		});
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	}
});

// Took the phone validation code from here,
// http://stackoverflow.com/questions/18900308/angularjs-dynamic-ng-pattern-validation
app.controller('PhoneValidationController', function($scope) {
	$scope.phoneNumberPattern = (function() {
		var regexp = /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;
		return {
			test: function(value) {
				if( $scope.requiredPhone === false ) {
					return true;
				}
				return regexp.test(value);
			}
		};
	})();
});

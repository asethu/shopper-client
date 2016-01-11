var app = angular.module('ShopperApp.Directives', []);

app.directive('shopperHeader', function () {
	return {
		restrict: 'AE',
		templateUrl: 'partials/header.html'
	}
});

app.directive('shopperBenefits', function () {
	return {
		restrict: 'AE',
		templateUrl: 'partials/benefits.html'
	}
});
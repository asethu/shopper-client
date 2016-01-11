var app = angular.module('ShopperApp',
		['ShopperApp.Controllers',
		 'ShopperApp.Directives',
		 'ShopperApp.Services',
		 'ui.bootstrap',
		 'ngAnimate']);

app.run(['SessionService', function(SessionService) {
	SessionService.setUser("arun");
}]);

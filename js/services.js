var app = angular.module('ShopperApp.Services', []);

app.factory('SessionService', function() {
	var sessionService = {
		user: null
	};

	sessionService.setUser = function(name) {
		sessionService.user = name;
	};

	return sessionService;
});

app.factory('APIService', function($http) {
	var restService = {};

	restService.createApplicant = function(firstName, lastName, city, email, phone, phoneType, isOver21) {
		return $http({
			method: "POST",
			url: 'http://localhost:9090/applicants',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'firstName': firstName,
				'lastName': lastName,
				'region': city,
				'email': email,
				'phone': phone,
				'phoneType': phoneType,
				'over21': isOver21
			}
		});
	};

	return restService;
});
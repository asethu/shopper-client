var app = angular.module('ShopperApp.Services', []);

app.factory('APIService', function($http) {
	var restService = {};

	restService.createApplicant = function(firstName, lastName, city, email, phone, phoneType, over21) {
		return $http({
			method: "POST",
			url: 'http://localhost:9000/applicants',
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
				'over21': over21
			}
		});
	};

	restService.getApplicant = function(email) {
		return $http({
			method: "GET",
			url: 'http://localhost:9000/applicants/' + email
		});
	};

	restService.updateApplicant = function(email, firstName, lastName, city, phone, phoneType, over21) {
		return $http({
			method: "PATCH",
			url: 'http://localhost:9000/applicants/' + email,
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				'firstName': firstName,
				'lastName': lastName,
				'region': city,
				'phone': phone,
				'phoneType': phoneType,
				'over21': over21
			}
		});
	};

	return restService;
});
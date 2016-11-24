'use strict';
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'pascalprecht.translate',
    'angular-click-outside',
    'app.directive'
]);

myApp.config([
    '$routeProvider',
    '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/live', {templateUrl: 'html/live.html'})
            .when('/camera', {templateUrl: 'html/camera.html'})
            .when('/feature', {templateUrl: 'html/user.html'})
            .when('/system', {templateUrl: 'html/user.html'})
            .when('/user', {templateUrl: 'html/user.html'})
    }
]);

//Config Multi Language
myApp.config([
    '$translateProvider',
    function ($translateProvider) {
        //Set file json for lanaguage
        $translateProvider.useStaticFilesLoader({prefix: 'translations/translation-', suffix: '.json'});
        //Load 'en' default
        $translateProvider.preferredLanguage('en');
    }
]);

//variable will use in all web
myApp.run(function ($rootScope) {
    $rootScope.urlServer = 'http://10.0.1.30:8080/';
    $rootScope.rememberUser = false;
    $rootScope.access_token = "";
    //Set Status icon of home page
})

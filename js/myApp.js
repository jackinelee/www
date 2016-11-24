'use strict';
var myApp = angular.module('myApp', ['ngRoute', 'ngCookies', 'pascalprecht.translate', 'angular-click-outside', 'app.directive']);

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
myApp.run(function ($rootScope, $cookies) {
    $rootScope.urlServer = 'http://10.0.1.30:8080/';
    $rootScope.rememberUser = false;
    $rootScope.access_token = "";
    //Set Status icon of home page

    $rootScope.getToken = function () {
        try {
            var user = JSON.parse(load_Cookie('vp_admin'));
            var params = {
                "userid": user.userid,
                "pswd": user.password
            };
            $.ajax({
                type: 'POST',
                url: $rootScope.urlServer + 'api/auth',
                crossDomain: true,
                data: JSON.stringify(params),
                dataType: 'json',
                success: function (o) {
                    $rootScope.access_token = o.token;
                },
                error: function (Response) {
            toastr.error('Something Wrong!');        
                    window.location.href = 'login.html';
                }
            });
        } catch (error) {
            toastr.error('Something Wrong!');
            window.location.href = 'login.html';
        }
    }

    function load_Cookie(cookie_key) {
        var cookie = $cookies.get(cookie_key);
        if (cookie) {
            if (cookie_key == 'Language') {
                return cookie;
            }
            // else {     var user = {         userid: cookie.userid,         password:
            // cookie.password,         access_token: cookie.access_token     }
            return cookie;
        }
    }
}
);

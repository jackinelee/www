'use strict';
var cookie_key = 'vp_admin';

myApp.controller('CookieController', ['$scope', '$cookies', '$rootScope', function ($scope, $cookies, $rootScope) {
    $rootScope.$on("CallParentMethod", function () {
        $scope.parentmethod();
    });
    $rootScope.$on("Call_GetCookie", function () {
        return $scope.load_Cookie();
    });
    $scope.load_Cookie = function () {
        var cookie = $cookies.get(cookie_key);
        if (cookie) {
            $scope.user = {
                userid: cookie.userid,
                password: cookie.password
                , access_token: cookie.access_token
            }
        
            return $scope.user;
        }

    }

   
    $rootScope.$on("Call_SaveCookie", function () {
        $scope.save_Cookie(userid,password, access_token);
    });

    $rootScope.save_Cookie = function (userid, password, access_token) {
        var cookie = {};
        cookie.userid = userid;
        cookie.access_token = access_token;
        $cookies.put(cookie_key, cookie);
    }


    // utility function to reconstruct Date object from ISO8601 string
    // browsers like IE7/8 don't support Date.parse(ISO8601)
    function date_from_ISO8601(_str) {
        var parts = _str.match(/\d+/g);
        return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]));
    }
}]);

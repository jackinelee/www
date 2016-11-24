'use strict';
myApp.controller('LoginController', [
    '$scope',
    '$http',
    '$rootScope',
    '$cookies',
    '$location',
    function ($scope, $http, $rootScope, $cookies, $location) {
        // currently logged in user id and password
        $scope.userId = '';
        $scope.password = '';
        $scope.isUpdateStoken = false;
        //
        // utility functions to work with $timeout service usage:
        //

        $scope.login = function () {
            $rootScope.rememberUser = document
                .getElementById('rememberId')
                .checked;
            if ($scope.userId && $scope.password) {
                $scope.sendLoginToServer()
            } else {
                toastr.error('Wrong user and password. Try again!');
            }
        }

        $scope.sendLoginToServer = function () {
            var params = {
                "userid": $scope.userId,
                "pswd": $scope.password
            };
            $.ajax({
                type: 'POST',
                url: $rootScope.urlServer + 'api/auth',
                crossDomain: true,
                data: JSON.stringify(params),
                dataType: 'json',
                success: function (o) {
                    $scope.errorMessage = "";
                    $scope.isWrongPassword = false;
                    $scope.loginSuccess(o);
                    window.location.href = 'index.html#/live';
                },
                error: function (Response) {
                    if (Response.status !== 401) {
                        toastr.error('Contact to admin!');
                    } else {
                        toastr.error('Wrong password. Try again!');
                    }
                }
            });
        }

        //Get another token when token timeout in server
        $rootScope.getTokenAgain = function () {
            try {
                $scope.isUpdateStoken = true;
                $scope.user = JSON.parse($scope.load_Cookie('vp_admin'));
                var params = {
                    "userid": $scope.user.userid,
                    "pswd": $scope.user.password
                };
                $.ajax({
                    type: 'POST',
                    url: $rootScope.urlServer + 'api/auth',
                    crossDomain: true,
                    data: JSON.stringify(params),
                    dataType: 'json',
                    success: function (o) {
                        $scope.userId = $scope.user.userid;
                        $scope.password = $scope.user.password;
                        $scope.loginSuccess(o);

                    },
                    error: function (Response) {
                        debugger;
                        window.location.href = 'login.html';
                    }
                });
            } catch (error) {
                debugger;
                window.location.href = 'login.html';
            }
        }

        $scope.loginSuccess = function (o) {
            var now = new Date();
            o.our_expire_time = new Date();
            o
                .our_expire_time
                .setTime(now.getTime() + (o.expire_in * 1000));
            $scope.access_token = o;
            $scope.save_Cookie($scope.userId, $scope.password, o.token);
            $rootScope.access_token = o.token;
        }

        $scope.logOut = function () {
            if (!$rootScope.rememberUser) {
                $scope.userId = "";
                $scope.password = "";
                $scope.access_token = "";
                $scope.save_Cookie($scope.userId, $scope.password, $scope.access_token);
                window.location.href = 'login.html';
            }
        }

        $scope.save_Cookie = function (userid, password, access_token) {
            var cookie = {};
            cookie.userid = userid;
            cookie.password = password;
            cookie.access_token = access_token;
            if ($rootScope.rememberUser || $scope.isUpdateStoken) {
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 365);
                // Setting a cookie
                $cookies.put('vp_admin', JSON.stringify(cookie), {'expires': expireDate});
            } else {
                $cookies.put('vp_admin', JSON.stringify(cookie));
            }
        }
    }
]);

'use strict';
myApp.controller('HomeController', [
    '$scope',
    '$rootScope',
    '$cookies',
    '$translate',
    function ($scope, $rootScope, $cookies, $translate) {

        $scope.isActiveLive = true;
        $scope.isActiveCameras = false;
        $scope.isActiveFeature = false;
        $scope.isActiveSystem = false;
        $scope.isActiveUser = false;
        $scope.isEnglish = true;

        $scope.set_ActiveLive = function () {
            $scope.saveToCookieSection('page', 'live');
            window.location.href = 'index.html#/live';
            $scope.isActiveLive = true;
            $scope.isActiveCameras = false;
            $scope.isActiveFeature = false;
            $scope.isActiveSystem = false;
            $scope.isActiveUser = false;
        }
        $scope.set_ActiveCameras = function () {
            $scope.saveToCookieSection('page', 'camera');
            window.location.href = 'index.html#/camera';
            $scope.isActiveLive = false;
            $scope.isActiveCameras = true;
            $scope.isActiveFeature = false;
            $scope.isActiveSystem = false;
            $scope.isActiveUser = false;
        }
        $scope.set_ActiveFeature = function () {
            $scope.saveToCookieSection('page', 'feature');
            window.location.href = 'index.html#/feature';
            $scope.isActiveLive = false;
            $scope.isActiveCameras = false;
            $scope.isActiveFeature = true;
            $scope.isActiveSystem = false;
            $scope.isActiveUser = false;
        }
        $scope.set_ActiveSystem = function () {
            $scope.saveToCookieSection('page', 'system');
            window.location.href = 'index.html#/system';
            $scope.isActiveLive = false;
            $scope.isActiveCameras = false;
            $scope.isActiveFeature = false;
            $scope.isActiveSystem = true;
            $scope.isActiveUser = false;
        }
        $scope.set_ActiveUser = function () {
            $scope.saveToCookieSection('page', 'user');
            window.location.href = 'index.html#/user';
            $scope.isActiveLive = false;
            $scope.isActiveCameras = false;
            $scope.isActiveFeature = false;
            $scope.isActiveSystem = false;
            $scope.isActiveUser = true;
        }

        //Check Page when user reload
        $scope.checkPageWhenReload = function () {
            var _page = $scope.load_Cookie('page');
            if (_page === 'live') {
                $scope.set_ActiveLive();
            } else if (_page === 'camera') {
                $scope.set_ActiveCameras();
            } else if (_page === 'feature') {
                $scope.set_ActiveFeature();
            }
             else if (_page === 'system') {
                $scope.set_ActiveSystem();
            }
             else if (_page === 'user') {
                $scope.set_ActiveUser();
            }
        }

        //Save value to cookie, and this value will have life in this section
        $scope.saveToCookieSection = function (name, value) {
            $cookies.put(name, value);
        }

        $scope.load_Cookie = function (cookie_key) {
            var cookie = $cookies.get(cookie_key);
            if (cookie) {
                if (cookie_key == 'Language') {
                    return cookie;
                } else {
                    $scope.user = {
                        userid: cookie.userid,
                        password: cookie.password,
                        access_token: cookie.access_token
                    }
                    return cookie;
                }
            }
        }

        var init = function () {
            try {
                $scope.user = JSON.parse($scope.load_Cookie('vp_admin'));
                if (!($scope.user.userid && $scope.user.access_token)) {
                    window.location.href = 'login.html';
                } else {
                    $rootScope.access_token = $scope.user.access_token;
                }
            } catch (error) {
                window.location.href = 'login.html';
            }
        };

        //Star translate
        var ctrl = this;
        ctrl.language = 'en';
        ctrl.updateLanguage = function () {
            $translate.use(ctrl.language);
        };
        //function user choose language
        $scope.chooseLanguage = function (item) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 365);
            // Setting a cookie
            $cookies.put('Language', item, {'expires': expireDate});
            ctrl.language = item;
            ctrl.updateLanguage();
            if (item === 'en') {
                $scope.isEnglish = true;
            } else {
                $scope.isEnglish = false;
            }
        }
        //checkLanguage of user when load page again
        $scope.checkLanguage = function () {
            $scope.language = ($scope.load_Cookie('Language'));
            if ($scope.language == 'fr') {
                ctrl.language = 'fr';
                $scope.isEnglish = false;
            } else {
                ctrl.language = 'en';
                $scope.isEnglish = true;
            }
            ctrl.updateLanguage();
        }
        //End translate
        init();
        $scope.checkLanguage();
        $scope.checkPageWhenReload ();
    }
]);

'use strict';

myApp.controller('UserCtrl', [
    '$scope',
    '$rootScope',
    '$http',
    function ($scope, $rootScope, $http) {

        $scope.tabActive = '1';/* 1 : user manangerment ; 2 : User group*/
        $scope.editGroup = 'off';
        $scope.user.id = '0';
        $scope.textHeaderModal = "NEW USER";
        $scope.textButtonModal = "ADD USER"
        $scope.isAddUser = true;
        $scope.dropdown = {};
        $scope.selectedGroup = {};
        $scope.userGroups = null;

        function collectInfoUser() {
            var _params = {
                "userid": $scope.userId,
                "name": $scope.userDisplayName,
                "pswd": $scope.password,
                "group_id": $scope.selectedGroup.id
            }
            return _params;
        }

        $scope.setupDopdownListGroup = function () {
            try {
                $rootScope.getToken();
                $scope.userGroups = GetGroups($rootScope.urlServer, $rootScope.access_token);
                $scope.dropdown.selectedIndex = 2;
                $scope.selectedGroup = $scope.userGroups[$scope.dropdown.selectedIndex];

            } catch (error) {}

        }

        $scope.changeValueDropbox = function (item) {
            $scope.selectedGroup = item;
            $scope.dropdown.selectedName = item.name;
            $scope.dropdown.selectId = item.id;
        }

        //Set data when user click update
        $scope.showCurrentUser = function (_user) {
            $scope.user.id = _user.id;
            $scope.userId = _user.userid;
            $scope.userDisplayName = _user.name;
            $scope.dropdown.selectId = _user.group_id;
            $scope.dropdown.selectedName = _user.nameGroup;
            $scope.headerModal = "UPDATE USER";
            $scope.textButtonModal = "UPDATE";
            $scope.isAddUser = false;
        }

        //Change Status when user click add user.
        $scope.showDataAddNewUser = function () {
            $scope.headerModal = "NEW USER";
            $scope.textButtonModal = "ADD USER";
            $scope.isAddUser = true;
        }

        // update date for groups Condition before send to server.
        $scope.addOrUpdateUser = function () {
            if ($scope.isAddUser) {
                if ($scope.checkUserFullInfo()) {
                    $scope.addUserToServer();
                }
            } else {
                if ($scope.checkUserFullInfo()) {
                    $scope.updateUserToServer();
                }
            }
        }

        //Check data user for update and new
        $scope.checkUserFullInfo = function () {
            $scope.isUserOK = true;
            if (($scope.userId.length < 4) || (!$scope.userId)) {
                $scope.isUserOK = false;
                toastr.error('User userId need longer 4 character!');
            } else if ((!$scope.userDisplayName) || ($scope.userDisplayName.length < 4)) {
                $scope.isUserOK = false;
                toastr.error('User display name need longer 4 character!');
            } else if (!$scope.password)
            { 
                    $scope.isUserOK = false;
                    toastr.error('User need to have a password!');
            } 
            else if(($scope.password!=null)&&($scope.password.length < 4)){
                    $scope.isUserOK = false;
                    toastr.error('Password need  longer 4 character. Try again!');
                }
             else if ($scope.password !== $scope.confirmPassword) {
                $scope.isUserOK = false;
                toastr.error('Wrong confirm password. Try again!');
            } else if ((!$scope.selectedGroup.id) || ($scope.selectedGroup.id == "?")) {
                $scope.isUserOK = false;
                toastr.error('User need to have group. Try again!');
            }
            return $scope.isUserOK;
        }

        //Sen new user after check condition.
        $scope.addUserToServer = function () {
            $rootScope.getTokenAgain();
            var _url = $rootScope.urlServer + 'api/users';
            $.ajax({
                type: 'POST',
                url: _url + '?access_token=' + $rootScope.access_token,
                crossDomain: true,
                data: JSON.stringify(collectInfoUser()),
                dataType: 'json',
                async: false,
                success: function (responseData, textStatus, jqXHR) {
                    toastr.success('Add ' + $scope.userDisplayName + ' success');
                    $scope.bindUsersToTable();

                },
                error: function (responseData, textStatus, errorThrown) {
                    toastr.error('Add ' + $scope.userDisplayName + ' fail');
                }
            });
        }

        $scope.deleteUser = function (_user) {
            $rootScope.getToken();
            var _url = $rootScope.urlServer + 'api/users/' + _user.id + '?access_token=' + $rootScope.access_token;
            $.ajax({
                method: 'DELETE',
                url: _url,
               // crossDomain: true,
              //  dataType: 'json',
                success: function (responseData, textStatus, jqXHR) {
                    alert('OK');
                },
                error: function (responseData, textStatus, errorThrown) {
                    alert('delete failed.');
                }
            });

                // var req = {
                // method: 'DELETE',
                // url: _url,
                // headers: {
                // 'Content-Type': undefined
                // },
                // data: { test: 'test' }
                // }

                // $http(req).then(function(){
                // alert('OK1');    
                // }, function(){
                // alert('No1');    
                // });

        }

        $scope.getUsersFromServer = function () {
            $rootScope.getToken();
            var result = undefined;
            var _url = $rootScope.urlServer + 'api/users';
            $.ajax({
                type: 'GET',
                url: _url + '?access_token=' + $rootScope.access_token,
                crossDomain: true,
                dataType: 'json',
                async: false,
                success: function (responseData, textStatus, jqXHR) {
                    result = responseData;
                },
                error: function (responseData, textStatus, errorThrown) {
                    window.location.href = 'login.html';
                }
            });
            return result;
        }

        $scope.updateUserToServer = function () {
            var id = $scope.user.id;
            $rootScope.getTokenAgain();
            var _url = $rootScope.urlServer + 'api/users/' + id + '?access_token=' + $rootScope.access_token;
            $.ajax({
                type: 'PUT',
                url: _url,
              // crossDomain: true,
                data: JSON.stringify(collectInfoUser()),
                dataType: 'json',
                success: function (responseData, textStatus, jqXHR) {
                    alert('OK');
                },
                error: function (responseData, textStatus, errorThrown) {
                    alert('POST failed.');
                }
            });
        }

        $scope.bindUsersToTable = function () {
            $scope.users = $scope.getUsersFromServer();
            try {
                if ($scope.users && (($scope.users.length !== null))) {
                    for (var i = 0; i < $scope.users.length; i++) {
                        if ($scope.users[i].group_id) {
                            var group = $.grep($scope.userGroups, function (e) {
                                return e.id == $scope.users[i].group_id;
                            });
                            //Add Group Name of user
                            $scope.users[i]['nameGroup'] = group[0].name;
                        }
                        //Add no for user
                        $scope.users[i]['no'] = i + 1;
                    }
                } else {
                    window.location.href = 'login.html';
                }
            } catch (error) {
                window.location.href = 'login.html';
            }

        }
        $scope.setupDopdownListGroup();
        $scope.bindUsersToTable();
    }
]);

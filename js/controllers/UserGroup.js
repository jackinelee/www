'use strict';
myApp.controller('UserGroupCtrl', function ($scope, $rootScope) {
    $scope.userGroups = {};
    $scope.groupSelected = [];
    var _params = {
        "name": $scope.groupName,
        "permissions": "system=----;user=----;camera=crud"
    }

    //Show Role
    $scope.roles = [
        {
            name: "Diable",
            isActive: false
        }, {
            name: "View",
            isActive: true
        }, {
            name: "Modify",
            isActive: false
        }
    ];
    //Format Value for UsersGroup
    $scope.bindData = function () {
        var newPermission = "";

        $rootScope.getTokenAgain();
        $scope.userGroups = GetGroups($rootScope.urlServer, $rootScope.access_token);
        $scope.groupSelected = $scope.userGroups[0];
        if (($scope.userGroups !== null) && ($scope.userGroups !== undefined) && $scope.userGroups) {
            for (var i = 0; i < $scope.userGroups.length; i++) {
                for (var j = 0; j < $scope.userGroups[i].permissions.length; j++) {
                    if ($scope.userGroups[i].permissions[j] === "=") {
                        newPermission += ":";
                    } else {
                        if ($scope.userGroups[i].permissions[j] === ";") {
                            newPermission += ",";
                        } else {
                            newPermission += $scope.userGroups[i].permissions[j]
                        }
                    }
                }
                debugger
                newPermission='{' + newPermission + '}';
                var permissionsGroup = JSON.parse(newPermission);

            }
        }
    }

    //Select group
    $scope.selectGroup = function (item) {
        $scope.groupSelected = item;
    }

    //Function add group user
    $scope.addGroup = function () {
        var _url = $rootScope.urlServer + 'api/usergroups';
        $.ajax({
            type: 'POST',
            url: _url + '?access_token=' + $rootScope.access_token,
            crossDomain: true,
            data: JSON.stringify(_params),
            dataType: 'json',
            success: function (responseData, textStatus, jqXHR) {
                debugger
                alert('OK');
            },
            error: function (responseData, textStatus, errorThrown) {
                alert('POST failed.');
            }
        });
    }

    //Function Update group user 'Peding Test'
    $scope.updateGroup = function () {
        var groupId = "";
        var _params = {
            "name": "Test Group",
            "permissions": "system=----;user=----;camera=crud"
        }
        var _url = $rootScope.urlServer + 'api/usergroups/';
        $.ajax({
            type: 'PUT',
            url: _url + groupId + '?access_token=' + $rootScope.access_token,
            crossDomain: true,
            data: JSON.stringify(_params),
            dataType: 'json',
            success: function (responseData, textStatus, jqXHR) {
                debugger
                alert('OK');
            },
            error: function (responseData, textStatus, errorThrown) {
                alert('POST failed.');
            }
        });
    }

    $scope.deleteGroup = function () {}
    $scope.bindData();
});
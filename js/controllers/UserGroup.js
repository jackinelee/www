'use strict';
myApp.controller('UserGroupCtrl', function ($scope, $rootScope) {
    $scope.userGroups = {};
    $scope.groupSelected = {};
    $scope.updateTime = Date.now();
    $scope.groupname="bao";
    var _params = {
        "name": $scope.groupName,
        "permissions": "system=----;user=----;camera=crud"
    }


//----------------Star Bind data View--------------------------------------------------------------------------------------
    //Show Role
    $scope.roles = [
        {
            name: "Disable",
            isActive: true
        }, {
            name: "View",
            isActive: false
        }, {
            name: "Modify",
            isActive: false
        }
    ];

        //get string role Return object role (with Modify, view or Disable)
        $scope.getRoleView=function(role){
             for(var i=0;i<$scope.roles.length;i++){
                    if($scope.roles[i].name===role)
                        {
                            $scope.roles[i].isActive=true;
                        }
                    else{
                            $scope.roles[i].isActive=false;
                         }
                }
                return $scope.roles;
        }


    //Map group and  _role_view_object
        $scope.mapGroupAndRoleViewObject=function()
        {
            for (var i = 0; i < $scope.userGroups.length; i++)
            {
                if($scope.userGroups[i].objPermissions.camera)
                {
                    if($scope.userGroups[i].objPermissions.camera=="crud")
                        {
                            $scope.userGroups[i].objRole = angular.copy($scope.getRoleView("Modify"));
                        }
                        else if($scope.userGroups[i].objPermissions.camera=="----")
                        {
                            $scope.userGroups[i].objRole = angular.copy($scope.getRoleView("Disable"));
                        }
                        else {
                            $scope.userGroups[i].objRole = angular.copy($scope.getRoleView("View"));
                        }
                }
            }
        }                                                                       

        //Convert role of group from  string to object
        $scope.groupFromStringToObject=function(){
            //Loop User
          var newPermission = '"';
            for (var i = 0; i < $scope.userGroups.length; i++) 
            {
                //Loop role
                //reset string permiassion
                newPermission = '"';
                for (var j = 0; j < $scope.userGroups[i].permissions.length; j++) {
                    //Check Role
                    if ($scope.userGroups[i].permissions[j] === '=') {
                        newPermission += '":"';
                    } else {
                        if ($scope.userGroups[i].permissions[j] === ';') {
                            newPermission += '","';
                        } else {
                            newPermission += $scope.userGroups[i].permissions[j]
                        }
                    }
                }
                newPermission='{' + newPermission + '"}';
                $scope.userGroups[i].objPermissions= JSON.parse(newPermission);
            }
        }

    //Format Value for UsersGroup
    $scope.bindData = function () {
        var objectPermissionsGroup =null;
        $rootScope.getTokenAgain();
        $scope.userGroups = GetGroups($rootScope.urlServer, $rootScope.access_token);
        $scope.groupSelected = $scope.userGroups[1];
        if (($scope.userGroups !== null) && ($scope.userGroups !== undefined) && $scope.userGroups) {
            $scope.groupFromStringToObject();
            $scope.mapGroupAndRoleViewObject();
        }
    }



    //Select group
    $scope.selectGroup = function (item) {
        $scope.groupSelected = item;
        $scope.groupname=$scope.groupSelected.name
        
        toastr.success($scope.groupSelected.name);
    }

//----------------End Bind data View--------------------------------------------------------------------------------------

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
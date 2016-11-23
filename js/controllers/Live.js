'use strict';
myApp.controller('LiveController', function($scope,$rootScope) {
    $rootScope.isActiveLive = true;
    $scope.cars = {
        car01 : {brand : "Ford", model : "Mustang", color : "red"},
        car02 : {brand : "Fiat", model : "500", color : "white"},
        car03 : {brand : "Volvo", model : "XC90", color : "black"}
    }

});


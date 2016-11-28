'use strict';

myApp.controller('CameraController' , [
    '$scope',
    '$rootScope',
    '$window',
    '$timeout',
    function ($scope, $rootScope, $window, $timeout) {
        $scope.classWidthGrid = 2;
        $rootScope.isActiveCameras = true;

        makeupGrid();

        angular.element($window).on("resize", function(){
            makeupGrid();
            $scope.$applyAsync();
        } );

        function makeupGrid() {
            var wh = $window.innerWidth;

            // START :: Set height for thumbnail
            $timeout(function () {
                var item_w =$('.camera-item').width();
                console.log(item_w);
                $scope.heightItem = item_w;
                $scope.$applyAsync();
        	}, 300, false);
            // END :: Set height for thumbnail

            /*Set width for item*/
            if (1200 < wh  && wh  < 1600) {
                $scope.classWidthGrid = 3;
            } else if (800 < wh  && wh  < 1201) {
                $scope.classWidthGrid = 4;
            } else if (wh  < 801) {
                $scope.classWidthGrid = 6;
            }else {
                $scope.classWidthGrid = 2;
            }
            /* END :: Set width for item*/


        }
        // END :: END function make up grid

        $scope.openEditmode = function() {
            var element = event.currentTarget; // returns the span DOM Element
            $(element).parents(".camera-item ").addClass('edit-mode');
            // console.log( $(element).parents(".camera-item ").html() );
        }
        $scope.closeEditmode = function() {
            var element = event.currentTarget; // returns the span DOM Element
            $(element).parents(".camera-item ").removeClass('edit-mode');
        }

        $scope.closeThis = function () {
            if( $('.add-box').addClass('open') ) {
                 $('.add-box').removeClass('open');
            }
        }
        $scope.closeThisManual = function () {
            if( $('.manual-add').addClass('open') ) {
                 $('.manual-add').removeClass('open');
            }
        }


    } /* END :: main function */
]);

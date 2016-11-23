var app = angular.module('app.directive', []);

app.controller('Ctrl', function($scope) {
    $scope.wks =  {number: 1, name: 'testing'};
});

app.directive('numberOnlyInput', function () {
    return {
        restrict: 'EA',
        template: '<input name="{{inputName}}" ng-model="inputValue" />',
        scope: {
            inputValue: '=',
            inputName: '='
        },
        link: function (scope) {
            scope.$watch('inputValue', function(newValue,oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue)) {
                    scope.inputValue = oldValue;
                }
            });
        }
    };
});


app.directive('ivaselect', function () {
  return {
    restrict: 'EA',
    link: function (scope, elm, attrs) {
        $(elm).selectpicker();
    }
  };
});

app.directive('popMenu', function () {
          return {
              restrict: 'A',
              link: function ($scope, $element) {
                  $element.on('click', function (event) {
                      $(this).parent().toggleClass("open");
                      $(this).prop("aria-expanded", true);
                  });                  
              }
          }
      });

//Directive for even text Enter.
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

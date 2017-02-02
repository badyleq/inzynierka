// Focus the element on page load
// Unless the user is on a small device, because this could obscure the page with a keyboard

angular.module('core')
  .directive('outTimer', ['$interval', 'dateFilter', function($interval, dateFilter) {

    function link(scope, element, attrs) {
      var timeoutId;
      function updateTime() {
        element.text(dateFilter(new Date(scope.date), scope.format));
      }

      scope.$watch(attrs.myCurrentTime, function(value) {
        updateTime();
      });

      element.on('$destroy', function() {
        $interval.cancel(timeoutId);
      });

      // start the UI update process; save the timeoutId for canceling
      timeoutId = $interval(function() {
        updateTime(); // update DOM
      }, 1000);
    }

    return {
      link: link
    };
  }]);
